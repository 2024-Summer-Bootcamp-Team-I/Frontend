// src/WaveGraph.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import InfoIcon from '@assets/img/InfoIcon.svg';
import WaveModal from './WaveModal';
import xbutton from '@src/assets/img/xbutton.svg';

const WaveGraph = ({ data }) => {
  const svgRef = useRef();
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  const [Modal, OpenModal] = useState(false);

  const HandleOpenModal = () => {
    if (!Modal) {
      OpenModal(true);
      console.log(Modal);
    } else {
      OpenModal(false);
      console.log(Modal);
    }
  };

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', '0 0 1392 640') // 차트 영역 크기 설정
      .classed('w-full h-full', true);

    // 날짜 파서 설정
    const parseDate = d3.timeParse('%Y-%m-%d');
    const formatDate = d3.timeFormat('%m.%d');

    // 데이터를 날짜 형식으로 변환
    data = data.map((d) => ({ date: parseDate(d.created_at), value: d.news_count }));

    // 파란 그래프와 하얀 그래프의 높이 차가 점수에 따라 달라지게 구현
    const data2 = data.map((d) => ({ date: d.date, value: 15 + d.value + 0.1 * d.value }));

    const chart = svg.append('g');

    // const x = d3
    //   .scaleTime()
    //   .domain([0,data.length-1])
    //   .domain(d3.extent(data, (d) => d.date))
    //   .range([0, 1392]);

    const x = d3
      .scalePoint() // x축의 도메인을 데이터의 날짜 배열로 설정 1
      .domain(data.map((d) => d.date)) // x축의 도메인을 데이터의 날짜 배열로 설정 2
      .range([0, 1392]);
    // .padding(0.5); // 포인트 간의 간격 조절(고정값이라 바꾸면 양옆이 비거나 초과할 수 있음)

    const y = d3.scaleLinear().domain([0, 370]).range([640, 0]); // 이 부분을 조절하면 위쪽에 여백을 남길 수 있음(신뢰도가 100일때 부자연스럽게 위에 닿는 것 방지)
    // 물론 range값이 축에도 영향을 주니 주의

    // const xAxis = d3.axisBottom(x).ticks(data.length).tickFormat(formatDate);;
    const xAxis = d3
      .axisBottom(x)
      .tickValues(data.map((d) => d.date)) // x축 눈금 설정. tickValues를 데이터의 날짜 배열로 설정하여 존재하는 날짜만
      .tickFormat(formatDate);

    d3.select(xAxisRef.current)
      .call(xAxis)
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '1rem')
      .style('font-wegith', 'bold');

    d3.select(xAxisRef.current).selectAll('.domain').attr('stroke', 'none');

    // 모든 눈금선 흰색으로 -> 근데 좀 이상해서 아예 없애는 게 나을 듯. 수직선과 디자인 차이가 나서 이질감 듬
    // d3.select(xAxisRef.current).selectAll('.tick line').attr('stroke', '#ffffff');

    // // 첫 번째 눈금선 제거
    // d3.select(xAxisRef.current)
    //   .selectAll('.tick line')
    //   .filter((d, i) => i === 0)
    //   .remove();

    // x축의 모든 눈금선 제거
    d3.select(xAxisRef.current).selectAll('.tick line').remove();

    const xAxisTicks = d3.select(xAxisRef.current).call(xAxis);
    xAxisTicks
      .selectAll('text')
      .filter((d, i, nodes) => i === 0)
      .style('fill', 'transparent'); // 첫 번째 날짜 스타일 적용
    xAxisTicks
      .selectAll('text')
      .filter((d, i, nodes) => i === nodes.length - 1)
      .style('fill', 'transparent'); // 마지막 날짜 스타일 적용

    // y축 설정
    const yTickValues = d3.range(0, 370, 50);
    const yAxis = d3.axisLeft(y).tickValues(yTickValues);
    d3.select(yAxisRef.current)
      .call(yAxis)
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '1rem')
      .attr('transform', 'translate(40, 0)'); //왜 이걸안하면 눈금이 안보일까..?
    // 심지어 20이나 40으로 하면 한자리수만보이고 30으로해야 제대로보임 -> 이마저도 100을 00이라고 표현해버림
    d3.select(yAxisRef.current).selectAll('.domain').attr('stroke', 'none');
    d3.select(yAxisRef.current).select('text:first-of-type').style('fill', 'transparent'); // 첫 눈금 숨기기

    // 하얀그래프용 그림자필터
    svg.append('defs').append('filter').attr('id', 'drop-shadow').attr('height', '130%').html(`
        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
        <feOffset dx="0" dy="-2" result="offsetblur"/>
        <feFlood flood-color="rgba(0,0,0,0.5)"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      `);

    // 파란그래프용 그림자필터
    svg.append('defs').append('filter').attr('id', 'drop-shadow2').attr('height', '130%').html(`
        <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
        <feOffset dx="0" dy="-2" result="offsetblur"/>
        <feFlood flood-color="rgba(0,0,0,0.6)"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      `);

    const area = d3
      .area()
      .x((d) => x(d.date))
      .y0(640)
      .y1((d) => y(d.value))
      .curve(d3.curveNatural);

    const whiteinitialArea = d3
      .area()
      .x((d) => x(d.date))
      .y0(640) // 시작 위치
      .y1(640)
      .curve(d3.curveNatural);

    const blueinitialArea = d3
      .area()
      .x((d) => x(d.date))
      .y0(640)
      .y1(640)
      .curve(d3.curveNatural);

    // 하얀그래프
    const whiteAreaPath = chart
      .append('path')
      .datum(data2)
      .attr('fill', '#ffffff')
      .attr('d', whiteinitialArea)
      .style('filter', 'url(#drop-shadow)'); // 필터 적용
    // 파란그래프
    const blueAreaPath = chart
      .append('path')
      .datum(data)
      .attr('fill', '#08B0D5')
      .attr('d', blueinitialArea)
      .style('filter', 'url(#drop-shadow2)'); // 필터 적용

    whiteAreaPath.transition().delay(50).duration(1200).ease(d3.easeCircleOut).attr('d', area);
    blueAreaPath.transition().delay(50).duration(1500).ease(d3.easeCircleOut).attr('d', area);

    // 수직선 추가 및 좌표 출력
    data.forEach((d, i) => {
      const xCoord = x(d.date);
      const yCoord = y(d.value);

      const isEdge = i === 0 || i === data.length - 1;

      // 수직선
      chart
        .append('line')
        .attr('x1', xCoord)
        .attr('x2', xCoord)
        .attr('y1', 640) // 초기에는 y1과 y2를 모두 하단에 설정. 애니메이션 넣기 전에는 여기도 yCoor였음
        .attr('y2', 640) // 차트의 하단 y좌표
        .attr('stroke', isEdge ? 'transparent' : '#ffffff')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5')
        .transition()
        .duration(1150)
        .attr('y2', yCoord); // 애니메이션을 통해 y2값을 실제 y값으로 이동

      // 좌표값
      chart
        .append('text')
        .attr('x', xCoord)
        .attr('y', d.value > 200 ? yCoord - 24 : d.value > 100 ? yCoord - 17.5 : yCoord - 15)
        .attr('fill', '#08B0D5')
        .attr('text-anchor', 'middle')
        .style('font-size', '1rem')
        .style('font-weight', 'bold')
        .style('opacity', 0) // 처음 투명도는 0
        .transition()
        .delay(1200)
        .ease(d3.easeCubicIn)
        .style('opacity', isEdge ? 0 : 1) // 애니메이션을 통해 투명도가 변화
        .text(d.value);
    });

    // 기존 wavePathGenerator 설정 및 선 그리기 부분 변경. 'class' 'd' 'stokre' 'stoke-width'를 지워야 선이 없어짐
    // chart
    //   .append('path')
    //   .datum(data)
    //   .attr('class', 'wave-path')
    //   .attr('d', wavePathGenerator)
    //   .attr('stroke', '#08B0D5')
    //   .attr('stroke-width', 2)
    //   .attr('fill', 'none');
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <svg ref={yAxisRef} className="w-10"></svg>
        <div className="flex flex-col">
          <div className="w-[87rem] h-[40rem] bg-[#fff0d5] rounded-[2.5rem]">
            <div
              className="fixed top-4 right-6 w-[7.5rem] h-8 flex justify-between items-center hover:text-black z-2"
              // className="fixed top-4 right-6 w-[7.5rem] h-8 flex justify-between items-center duration-200 hover:filter hover:invert transition-filter z-2"
            >
              <p className="text-[1.25rem] text-[#505050] font-bold">수치정보</p>
              <button onClick={HandleOpenModal} className="duration-200 hover:filter hover:invert transition-filter">
                {Modal ? <img src={xbutton} /> : <img src={InfoIcon} />}
              </button>
            </div>
            {Modal ? <WaveModal /> : null}
            <svg ref={svgRef} className="rounded-[2.5rem]"></svg>
          </div>
          <svg ref={xAxisRef} className="h-10 w-[87rem]"></svg>
        </div>
      </div>
    </div>
  );
};

export default WaveGraph;
