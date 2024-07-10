import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// 게이지 설정 인터페이스
interface GaugeSettings {
  minValue?: number;
  maxValue?: number;
  waveHeight?: number;
  waveCount?: number;
  waveRiseTime?: number;
  waveAnimateTime?: number;
  waveRise?: boolean;
  waveHeightScaling?: boolean;
  waveAnimate?: boolean;
  waveOffset?: number;
  textVertPosition?: number;
  textSize?: number;
  valueCountUp?: boolean;
  displayPercent?: boolean;
  textColor?: string;
  waveTextColor?: string;
  outerFillGradient?: { start: string; end: string };
  colorRange?: {
    gradient1: { start: string; end: string };
    gradient2: { start: string; end: string };
    gradient3: { start: string; end: string };
    gradient4: { start: string; end: string };
  };
}

// LiquidFillGaugeProps 인터페이스 정의
interface LiquidFillGaugeProps {
  elementId: string;
  value: number;
  config?: GaugeSettings;
}

// 기본 설정 함수
const liquidFillGaugeDefaultSettings = (): GaugeSettings => ({
  minValue: 0, // 게이지의 최소값
  maxValue: 100, // 게이지의 최대값
  waveHeight: 0.1, // 파동 원의 높이 (반지름의 백분율)
  waveCount: 1, // 파동 원의 너비당 전체 파동의 개수
  waveRiseTime: 1000, // 파동이 0에서 최종 높이까지 상승하는 시간 (밀리초)
  waveAnimateTime: 5000, // 전체 파동이 파동 원에 들어가는 시간 (밀리초)
  waveRise: true, // 파동이 0에서 최종 높이까지 상승할지 또는 처음부터 최종 높이에 있을지 제어
  waveHeightScaling: true, // 낮은 채우기 비율과 높은 채우기 비율에서 파동 크기 스케일링 제어
  waveAnimate: true, // 파동이 스크롤될지 또는 정적일지 제어
  waveOffset: 0, // 파동의 초기 오프셋 양 (0 = 오프셋 없음, 1 = 전체 파동 오프셋)
  textVertPosition: 0.5, // 파동 원 내에서 백분율 텍스트의 높이 (0 = 하단, 1 = 상단)
  textSize: 1, // 파동 원 내 텍스트의 상대적 높이 (1 = 50%)
  valueCountUp: true, // true일 경우, 로딩 시 표시된 값이 0에서 최종 값으로 카운트됨. false일 경우, 최종 값이 바로 표시됨
  displayPercent: true, // true일 경우, 값 뒤에 % 기호가 표시됨
  textColor: '#fff', // 파동이 텍스트를 덮지 않을 때 값 텍스트의 색상
  waveTextColor: '#fff', // 파동이 텍스트를 덮을 때 값 텍스트의 색상
  outerFillGradient: { start: '#106AAB', end: '#113D66' }, // 파동이 덮지 않은 부분의 색상 추가
  colorRange: {
    gradient1: { start: '#DA4E00', end: '#B30000' },
    gradient2: { start: '#E6EB00', end: '#EBC500' },
    gradient3: { start: '#96CDFF', end: '#00E6B9' },
    gradient4: { start: '#379FFF', end: '#647CF9' },
  },
});

const LiquidFillGauge: React.FC<LiquidFillGaugeProps> = ({ elementId, value, config }) => {
  const gaugeRef = useRef<SVGSVGElement>(null);
  const settings = { ...liquidFillGaugeDefaultSettings(), ...config }; // 설정이 없으면 기본 설정을 사용

  useEffect(() => {
    if (gaugeRef.current) {
      loadLiquidFillGauge(gaugeRef.current, value, settings);
    }
  }, [value, settings]);

  return <svg id={elementId} ref={gaugeRef} className="w-full h-full" />;
};

// 게이지 로드 함수
const loadLiquidFillGauge = (element: SVGSVGElement, value: number, config: GaugeSettings) => {
  const gauge = d3.select(element); // 게이지 요소 선택
  const radius = Math.min(parseInt(gauge.style('width')), parseInt(gauge.style('height'))) / 2; // 게이지의 반지름 계산 (너비와 높이 중 작은 값의 절반)
  const locationX = parseInt(gauge.style('width')) / 2 - radius; // 게이지의 X 위치 계산
  const locationY = parseInt(gauge.style('height')) / 2 - radius; // 게이지의 Y 위치 계산
  const fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue; // 채우기 비율 계산 (0에서 1 사이의 값)

  const waveHeightScale = config.waveHeightScaling // 파동 높이 스케일 설정
    ? d3.scaleLinear().range([0, config.waveHeight, 0]).domain([0, 50, 100])
    : d3.scaleLinear().range([config.waveHeight, config.waveHeight]).domain([0, 100]);

  const textPixels = (config.textSize * radius) / 2; // 텍스트 크기 설정
  const textFinalValue = Math.round(value); // 최종 값 설정
  const textStartValue = config.valueCountUp ? config.minValue : textFinalValue; // 시작 값 설정 (카운트업이 설정된 경우)
  const percentText = config.displayPercent ? '%' : ''; // 퍼센트 텍스트 설정
  const waveHeight = radius * waveHeightScale(fillPercent * 100); // 파동 높이 계산

  // 파동의 길이와 개수 계산
  const waveLength = (radius * 2) / config.waveCount;
  const waveClipCount = 1 + config.waveCount;
  const waveClipWidth = waveLength * waveClipCount;

  // 값을 정수로 표시하는 반올림 함수
  const textRounder = (value: number) => Math.round(value);

  // 클립 파동 영역을 구성하기 위한 데이터
  const data = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    data.push({ x: i / (40 * waveClipCount), y: i / 40 });
  }

  // 클립 경로의 크기를 제어하는 스케일
  const waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
  const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

  // 클립 경로의 위치를 제어하는 스케일
  const waveRiseScale = d3
    .scaleLinear()
    // 클립 영역의 크기는 채우기 원의 높이 + 파동 높이입니다.
    // 0%에서 클립 파동이 채우기 원에 전혀 겹치지 않도록 하고, 100%에서 완전히 덮도록 위치를 설정합니다.
    .range([radius * 2 + waveHeight, waveHeight])
    .domain([0, 1]);
  const waveAnimateScale = d3
    .scaleLinear()
    .range([0, waveClipWidth - radius * 2]) // 클립 영역을 한 파동 밀고 나서 다시 스냅백
    .domain([0, 1]);

  // 게이지 내 텍스트 위치를 제어하는 스케일
  const textRiseScaleY = d3
    .scaleLinear()
    .range([radius * 2, textPixels * 0.7])
    .domain([0, 1]);

  // 그라디언트 정의 함수
  const defineGradient = (
    defs: d3.Selection<SVGDefsElement, unknown, HTMLElement, any>,
    id: string,
    start: string,
    end: string,
  ) => {
    const gradient = defs
      .append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', start);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', end);
  };

  // 색상 선택 함수
  const getColor = (value: number) => {
    if (value <= 25) return 'url(#gradient1)';
    if (value <= 50) return 'url(#gradient2)';
    if (value <= 75) return 'url(#gradient3)';
    return 'url(#gradient4)';
  };

  // 게이지 그룹 생성
  const gaugeGroup = gauge.append('g').attr('transform', `translate(${locationX},${locationY})`);
  const defs = gaugeGroup.append('defs');
  defineGradient(defs, 'gradient1', config.colorRange!.gradient1.start, config.colorRange!.gradient1.end);
  defineGradient(defs, 'gradient2', config.colorRange!.gradient2.start, config.colorRange!.gradient2.end);
  defineGradient(defs, 'gradient3', config.colorRange!.gradient3.start, config.colorRange!.gradient3.end);
  defineGradient(defs, 'gradient4', config.colorRange!.gradient4.start, config.colorRange!.gradient4.end);
  defineGradient(defs, 'outerFillGradient', config.outerFillGradient!.start, config.outerFillGradient!.end);

  // 게이지 외부 원 생성
  const gaugeCircleArc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2 * Math.PI);
  gaugeGroup.append('path').attr('d', gaugeCircleArc()!).attr('transform', `translate(${radius},${radius})`);
  gaugeGroup
    .append('circle')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius)
    .style('fill', 'url(#outerFillGradient)');

  // 텍스트 생성
  const text1 = gaugeGroup
    .append('text')
    .text(textStartValue + percentText)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', textPixels + 'px')
    .style('fill', config.textColor)
    .attr('transform', `translate(${radius},${textRiseScaleY(config.textVertPosition!)})`);

  // 클립 영역 생성
  const clipArea = d3
    .area()
    .x((d) => waveScaleX(d.x))
    .y0((d) =>
      waveScaleY(
        Math.sin(Math.PI * 2 * config.waveOffset! * -1 + Math.PI * 2 * (1 - config.waveCount!) + d.y * 2 * Math.PI),
      ),
    )
    .y1(() => radius * 2 + waveHeight);

  const waveGroup = gaugeGroup
    .append('defs')
    .append('clipPath')
    .attr('id', 'clipWave' + element.id);
  const wave = waveGroup.append('path').datum(data).attr('d', clipArea).attr('T', 0);

  // 내부 원 생성
  const fillCircleGroup = gaugeGroup.append('g').attr('clip-path', 'url(#clipWave' + element.id + ')');
  fillCircleGroup
    .append('circle')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius)
    .style('fill', getColor(textFinalValue));

  // 파동 텍스트 생성
  const text2 = fillCircleGroup
    .append('text')
    .text(textStartValue + percentText)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', textPixels + 'px')
    .style('fill', config.waveTextColor)
    .attr('transform', `translate(${radius},${textRiseScaleY(config.textVertPosition!)})`);

  // 값 증가 애니메이션 설정
  if (config.valueCountUp) {
    const textTween = function (this: SVGTextElement) {
      const i = d3.interpolate(parseFloat(this.textContent!.replace('%', '')), textFinalValue);
      return function (t: number) {
        this.textContent = textRounder(i(t)) + percentText;
      };
    };
    text1.transition().duration(config.waveRiseTime!).tween('text', textTween);
    text2.transition().duration(config.waveRiseTime!).tween('text', textTween);
  }

  const waveGroupXPosition = radius * 2 - waveClipWidth;
  if (config.waveRise) {
    waveGroup
      .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(0)})`)
      .transition()
      .duration(config.waveRiseTime!)
      .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`)
      .on('start', () => {
        wave.attr('transform', 'translate(1,0)');
      });
  } else {
    waveGroup.attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`);
  }

  if (config.waveAnimate) animateWave();

  // 파동 애니메이션 함수
  function animateWave() {
    wave.attr('transform', `translate(${waveAnimateScale(wave.attr('T')!)},0)`);
    wave
      .transition()
      .duration(config.waveAnimateTime! * (1 - wave.attr('T')))
      .ease(d3.easeLinear)
      .attr('transform', `translate(${waveAnimateScale(1)},0)`)
      .attr('T', 1)
      .on('end', () => {
        wave.attr('T', 0);
        animateWave();
      });
  }

  return {
    update: (value: number) => {
      const textFinalValue = Math.round(value);
      const textTween = function (this: SVGTextElement) {
        const i = d3.interpolate(this.textContent!.replace('%', ''), textFinalValue);
        return function (t: number) {
          this.textContent = textRounder(i(t)) + percentText;
        };
      };
      text1.transition().duration(config.waveRiseTime!).tween('text', textTween);
      text2.transition().duration(config.waveRiseTime!).tween('text', textTween);

      const fillPercent = Math.max(config.minValue!, Math.min(config.maxValue!, value)) / config.maxValue!;

      const waveHeight = radius * waveHeightScale(fillPercent * 100);

      const waveRiseScale = d3
        .scaleLinear()
        .range([radius * 2 + waveHeight, waveHeight])
        .domain([0, 1]);

      const newHeight = waveRiseScale(fillPercent);

      const waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
      const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

      const newClipArea = config.waveHeightScaling
        ? d3
            .area()
            .x((d) => waveScaleX(d.x))
            .y0((d) =>
              waveScaleY(
                Math.sin(
                  Math.PI * 2 * config.waveOffset! * -1 + Math.PI * 2 * (1 - config.waveCount!) + d.y * 2 * Math.PI,
                ),
              ),
            )
            .y1(() => radius * 2 + waveHeight)
        : clipArea;

      const newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
      wave
        .transition()
        .duration(0)
        .transition()
        .duration(config.waveAnimate ? config.waveAnimateTime! * (1 - wave.attr('T')) : config.waveRiseTime!)
        .ease(d3.easeLinear)
        .attr('d', newClipArea)
        .attr('transform', `translate(${newWavePosition},0)`)
        .attr('T', '1')
        .on('end', () => {
          if (config.waveAnimate) {
            wave.attr('transform', `translate(${waveAnimateScale(0)},0)`);
            animateWave();
          }
        });

      waveGroup
        .transition()
        .duration(config.waveRiseTime!)
        .attr('transform', `translate(${waveGroupXPosition},${newHeight})`);
    },
  };
};

export default LiquidFillGauge;
