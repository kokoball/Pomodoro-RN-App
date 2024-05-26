import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import Canvas from 'react-native-canvas';

const Timer = () => {
  const canvasRef = useRef<Canvas>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const interval = setInterval(() => {
      if (startTime && Date.now() - startTime < 60000) {
        setStartTime(startTime);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let animationFrameId: number;

    if (canvas) {
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');

      const drawWedge = (
        w: {
          cx: number;
          cy: number;
          radius: number;
          startAngle: number;
          endAngle: number;
        },
        fill: string,
        stroke: string,
        strokewidth: number,
      ) => {
        const {cx, cy, radius, startAngle, endAngle} = w;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 바깥 흰 영역
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 45, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1; // 가장 바깥 테두리
        ctx.stroke();

        // 색상 타이머 영역
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle, true);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokewidth;
        ctx.stroke();

        // 안쪽 영역
        ctx.beginPath();
        ctx.arc(cx, cy, radius / 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
      };

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = startTime ? currentTime - startTime : 0;
        const angle = (elapsed / 60000) * 2 * Math.PI;
        const wedge = {
          cx: 150,
          cy: 150,
          radius: 100,
          startAngle: -Math.PI / 2,
          endAngle: -Math.PI / 2 + angle,
        };

        drawWedge(wedge, 'green', 'black', 1);

        if (elapsed < 60000) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [startTime]);

  return <Canvas style={styles.canvas} ref={canvasRef} />;
};

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: 300,
  },
});

export default Timer;
