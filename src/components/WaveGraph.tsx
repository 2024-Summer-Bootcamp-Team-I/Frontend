// src/WaveGraph.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import polygon from '@assets/img/Polygon5.svg';

const WaveGraph = ({ data }) => {
  // 파란 그래프와 하얀 그래프의 높이 차가 점수에 따라 달라지게 구현
  // const data2 = [];
  // for (var i = 0; i < data.length; i++) {
  //   data2[i] = 1.15 * data[i];
  // }
  const svgRef = useRef();
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', '0 0 1000 584') // 차트 영역 크기 설정
      .classed('w-full h-full', true);

    // 날짜 파서 설정
    const parseDate = d3.timeParse('%Y-%m-%d');
    const formatDate = d3.timeFormat('%m.%d');

    // 데이터를 날짜 형식으로 변환
    data = data.map((d) => ({ date: parseDate(d.date), value: d.value }));
    const data2 = data.map((d) => ({ date: d.date, value: 1.15 * d.value }));

    const chart = svg.append('g');

    const x = d3
      // .scaleLinear()
      // .domain([0, data.length - 1])
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, 1000]);

    const y = d3.scaleLinear().domain([0, 110]).range([584, 0]); // 이 부분을 조절하면 위쪽에 여백을 남길 수 있음(신뢰도가 100일때 부자연스럽게 위에 닿는 것 방지)
    // 물론 range값이 축에도 영향을 주니 주의

    // const xAxis = d3.axisBottom(x).ticks(data.length);
    const xAxis = d3.axisBottom(x).ticks(data.length).tickFormat(formatDate);
    d3.select(xAxisRef.current)
      .call(xAxis)
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '1rem')
      .style('font-wegith', 'bold');

    d3.select(xAxisRef.current).selectAll('.domain').attr('stroke', 'none');

    const xAxisTicks = d3.select(xAxisRef.current).call(xAxis);
    xAxisTicks
      .selectAll('text')
      .filter((d, i, nodes) => i === 0)
      .style('fill', 'transparent'); // 첫 번째 눈금 스타일 적용
    xAxisTicks
      .selectAll('text')
      .filter((d, i, nodes) => i === nodes.length - 1)
      .style('fill', 'transparent'); // 마지막 눈금 스타일 적용

    // y축 설정
    const yTickValues = d3.range(0, 105, 25);
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
      .y0(584)
      .y1((d) => y(d.value))
      .curve(d3.curveNatural);

    const whiteinitialArea = d3
      .area()
      .x((d) => x(d.date))
      .y0(544)
      .y1(584)
      .curve(d3.curveNatural);

    const blueinitialArea = d3
      .area()
      .x((d) => x(d.date))
      .y0(584)
      .y1(584)
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
    data.forEach((d) => {
      const xCoord = x(d.date);
      const yCoord = y(d.value);

      chart
        .append('line')
        .attr('x1', xCoord)
        .attr('x2', xCoord)
        .attr('y1', 584) // 초기에는 y1과 y2를 모두 하단에 설정. 애니메이션 넣기 전에는 여기도 yCoor였음
        .attr('y2', 584) // 차트의 하단 y좌표
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5')
        .transition()
        .duration(1150)
        .attr('y2', yCoord); // 애니메이션을 통해 y2값을 실제 y값으로 이동

      chart
        .append('text')
        .attr('x', xCoord)
        .attr('y', yCoord - 15)
        .attr('fill', '#08B0D5')
        .attr('text-anchor', 'middle')
        .style('font-size', '1rem')
        .style('font-weight', 'bold')
        .style('opacity', 0)
        .transition()
        .delay(1200)
        .ease(d3.easeCubicIn)
        .style('opacity', 1)
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
    <div className="flex flex-col items-center mt-[10rem]">
      <img src={polygon} className="h-6"></img>
      <div className="flex">
        <svg ref={yAxisRef} className="w-10"></svg>
        <div className="flex flex-col">
          <div className="w-[62.5rem] h-[36.5rem] bg-[#fff0d5] rounded-[2.5rem]">
            <svg ref={svgRef} className="rounded-[2.5rem]"></svg>
          </div>
          <svg ref={xAxisRef} className="h-10 w-[62.5rem]"></svg>
        </div>
      </div>
    </div>
  );
};

export default WaveGraph;