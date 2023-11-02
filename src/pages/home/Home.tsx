import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [color, setColor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [size, setSize] = useState<number>(50);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      const width = context.canvas.width;
      const height = context.canvas.height;

      // setting background
      context.fillStyle = color.length > 0 ? color : 'white';
      context.fillRect(0, 0, width, height);

      // setting text
      if (text.length > 0) {
        context.font = `bolder ${size}px -apple-system`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'white';

        for (let row = 0; row <= width; row += (size + 10)) {
          for (let column = 0; column <= height; column += (size + 10)) {
            context.fillText(text, row, column);
          }
        }
      }
      context.restore();
    }
  }, [color, text, size]);

  function download() {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'watchface.png';
      link.href = canvasRef.current.toDataURL();

      link.click();
    }
  }

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>Creating</h1>

      <div className={styles.input}>
        <label htmlFor='colorPicker'>Choose a color</label>
        <input id='colorPicker' onChange={e => setColor(e.target.value)} type='color' />
      </div>

      <p className={styles.textDivider}>OR</p>

      <div className={styles.input}>
        <label htmlFor='colorInput'>Type an CSS Color</label>
        <input id='colorInput' onChange={e => setColor(e.target.value)} type='text' />
      </div>

      <hr />

      <div className={styles.input}>
        <label htmlFor='textInput'>Type a text (or an emoji, be creative)</label>
        <input id='textInput' onChange={e => setText(e.target.value)} type='text' />
      </div>

      <div className={styles.input}>
        <label htmlFor='sizeInput'>Type the text size</label>
        <input id='sizeInput' onChange={e => setSize(parseInt(e.target.value))} type='number' />
      </div>

      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} width={240} height={280}></canvas>
        <button className={styles.button} onClick={download}>Download</button>
      </div>
    </article>
  )
}

export default Home;