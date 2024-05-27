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
      canvas.width = 350;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');

      const drawWedge = (
        w: {
          cx: number;
          cy: number;
          radius: number;
          startAngle: number;
          endAngle: number;
        },
        mainColor: string,
        subColor: string,
      ) => {
        const {cx, cy, radius, startAngle, endAngle} = w;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 바깥 흰 영역
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 55, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 색상 타이머 영역
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = mainColor;
        ctx.fill();

        // 안쪽 영역
        ctx.beginPath();
        ctx.arc(cx, cy, radius / 3.6, 0, 2 * Math.PI);
        ctx.fillStyle = subColor;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = mainColor;
        ctx.font = '14px JetBrainsMono-Light';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < 12; i++) {
          const numAngle = (i - 3) * (Math.PI / 6);
          const nx = cx + Math.cos(numAngle) * (radius + 25);
          const ny = cy + Math.sin(numAngle) * (radius + 25);
          ctx.fillText((i * 5).toString(), nx, ny);

          const lineAngle = (i * Math.PI) / 6;
          const x1 = cx + Math.cos(lineAngle) * (radius + 38);
          const y1 = cy + Math.sin(lineAngle) * (radius + 38);
          const x2 = cx + Math.cos(lineAngle) * (radius + 50);
          const y2 = cy + Math.sin(lineAngle) * (radius + 50);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = mainColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      };

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = startTime ? currentTime - startTime : 0;
        const angle = (elapsed / 60000) * 2 * Math.PI;
        const wedge = {
          cx: 180,
          cy: 200,
          radius: 100,
          startAngle: -Math.PI / 2,
          endAngle: -Math.PI / 2 - angle,
        };

        drawWedge(wedge, '#07694F', '#F5CC9F');

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
    height: 500,
  },
});

export default Timer;
