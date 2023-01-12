import React, { useState, useRef, useEffect } from 'react';

export const generateCaptcha = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // function to generate random captcha images
  const text = generateRandomString();
  function generateRandomString() {
    // possible characters that will make up the captcha image
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; ++i) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  }

  // canvas image dimensions and background color
  canvas.width = 200;
  canvas.height = 70;
  ctx.fillStyle = '#f3f3f3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#333';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  return {
    src: canvas.toDataURL(),
    text: text,
  };
};

interface CaptchaProps {
  captcha: string;
  setCaptcha: (captcha: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ captcha, setCaptcha }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { src, text } = generateCaptcha();
      setCaptcha(text);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      const image = new Image();
      image.src = src;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    }
  }, []);

  return (
    <div style={{ paddingBottom: '25px' }}>
      <canvas
        ref={canvasRef}
        width="200"
        height="70"
        style={{ border: '1px solid #ccc' }}></canvas>
    </div>
  );
};

export const validateCaptcha = (input: string, captcha: string) => {
  return input.toLowerCase() === captcha.toLowerCase();
};

export default Captcha;
