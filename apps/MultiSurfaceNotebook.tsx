import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// types for drag items used in grid and sticky notes
interface Item {
  id: string;
  type: 'text' | 'square' | 'circle' | 'note';
  x: number;
  y: number;
  color?: string;
  text?: string;
}

type Mode = 'ruled' | 'simple' | 'grid' | 'blank' | 'code' | 'sticky' | 'reading';

const MultiSurfaceNotebook: React.FC = () => {
  const location = useLocation();
  const startFull = new URLSearchParams(location.search).get('fullscreen') === '1';
  const [mode, setMode] = useState<Mode>('ruled');
  const [fullScreen, setFullScreen] = useState(startFull);
  const openInNewTab = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('fullscreen', '1');
    window.open(url.toString(), '_blank');
  };
  return (
    <div className={fullScreen ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto space-y-4' : 'space-y-4'}>
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={() => setMode('ruled')} className={`px-3 py-1 rounded ${mode==='ruled'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Ruled</button>
        <button onClick={() => setMode('simple')} className={`px-3 py-1 rounded ${mode==='simple'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Simple</button>
        <button onClick={() => setMode('grid')} className={`px-3 py-1 rounded ${mode==='grid'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Grid</button>
        <button onClick={() => setMode('blank')} className={`px-3 py-1 rounded ${mode==='blank'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Blank</button>
        <button onClick={() => setMode('code')} className={`px-3 py-1 rounded ${mode==='code'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Code</button>
        <button onClick={() => setMode('sticky')} className={`px-3 py-1 rounded ${mode==='sticky'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Sticky</button>
        <button onClick={() => setMode('reading')} className={`px-3 py-1 rounded ${mode==='reading'?'bg-indigo-600 text-white':'bg-gray-200'}`}>Read</button>
        <button onClick={() => fullScreen ? setFullScreen(false) : openInNewTab()} className="ml-auto px-3 py-1 border rounded">{fullScreen?'Exit':'Full Screen'}</button>
      </div>
      {mode==='ruled' && <RuledNotebook/>}
      {mode==='simple' && <SimpleNotes/>}
      {mode==='grid' && <GridNotes/>}
      {mode==='blank' && <BlankCanvas/>}
      {mode==='code' && <CodeNotebook/>}
      {mode==='sticky' && <StickyBoard/>}
      {mode==='reading' && <ReadingMode/>}
    </div>
  );
};

// -------------------- Ruled Notebook --------------------
const RuledNotebook: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [font, setFont] = useState('serif');
  const [size, setSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [content, setContent] = useState('');

  const exec = (cmd:string, val?:string) => document.execCommand(cmd,false,val);
  const onInput = () => setContent(ref.current?.innerText || '');
  const insertDate = () => exec('insertText', new Date().toLocaleString());

  const exportPdf = async () => {
    if(!ref.current) return;
    const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
    const js = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm');
    const canvas = await html2canvas(ref.current);
    const img = canvas.toDataURL('image/png');
    const pdf = new js.jsPDF();
    const w = pdf.internal.pageSize.getWidth();
    const h = canvas.height * w / canvas.width;
    pdf.addImage(img,'PNG',0,0,w,h);
    pdf.save('note.pdf');
  };

  const wordCount = content.trim()? content.trim().split(/\s+/).length : 0;
  const charCount = content.replace(/\s/g,'').length;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 text-sm">
        <select value={font} onChange={e=>setFont(e.target.value)} className="border p-1">
          <option value="serif">Serif</option>
          <option value="Georgia">Georgia</option>
          <option value="Merriweather">Merriweather</option>
          <option value="sans-serif">Sans</option>
          <option value="monospace">Mono</option>
        </select>
        <input type="number" className="border w-16 p-1" value={size} onChange={e=>setSize(parseInt(e.target.value,10)||16)} />
        <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
        <button onClick={()=>exec('bold')} className="px-2 border rounded">B</button>
        <button onClick={()=>exec('italic')} className="px-2 border rounded italic">I</button>
        <button onClick={()=>exec('underline')} className="px-2 border rounded">U</button>
        <button onClick={()=>exec('insertUnorderedList')} className="px-2 border rounded">•</button>
        <button onClick={()=>exec('insertHTML','<input type=\'checkbox\'/> ')} className="px-2 border rounded">☐</button>
        <button onClick={insertDate} className="px-2 border rounded">Date</button>
        <button onClick={exportPdf} className="px-2 border rounded bg-green-500 text-white">Export</button>
      </div>
      <div
        ref={ref}
        onInput={onInput}
        contentEditable
        style={{
          fontFamily: font,
          fontSize: size,
          color,
          lineHeight: `${size * 1.5}px`,
          backgroundSize: `100% ${size * 1.5}px`,
          backgroundPosition: `0 ${size * 1.5 - 2}px`,
          backgroundImage: `repeating-linear-gradient(to_bottom,transparent 0,transparent ${size * 1.5 - 2}px,rgba(147,197,253,0.4) ${size * 1.5 - 2}px,rgba(147,197,253,0.4) ${size * 1.5}px)`
        }}
        className="min-h-[300px] p-4 border rounded focus:outline-none"
      />
      <div className="text-right text-xs text-gray-500 mt-1">Words: {wordCount} Chars: {charCount}</div>
    </div>
  );
};

// -------------------- Simple Notes --------------------
const SimpleNotes: React.FC = () => {
  const [text,setText] = useState('');
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    setText(el.value);
  };
  const copy = async () => { await navigator.clipboard.writeText(text); };
  const clear = () => setText('');
  const exportTxt = () => {
    const blob = new Blob([text],{type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const wordCount = text.trim()? text.trim().split(/\s+/).length:0;
  return (
    <div className="space-y-2">
      <textarea ref={areaRef} value={text} onChange={handleChange} className="w-full min-h-[200px] p-3 border rounded resize-none font-sans" />
      <div className="flex gap-2">
        <button onClick={clear} className="px-3 py-1 border rounded bg-gray-200">Clear</button>
        <button onClick={copy} className="px-3 py-1 border rounded bg-gray-200">Copy</button>
        <button onClick={exportTxt} className="px-3 py-1 border rounded bg-gray-200">Export</button>
      </div>
      <div className="text-right text-xs text-gray-500">Words: {wordCount} Chars: {text.length}</div>
    </div>
  );
};

// -------------------- Grid Notes --------------------
const GridNotes: React.FC = () => {
  const [items,setItems] = useState<Item[]>([]);
  const [drag,setDrag] = useState<string|null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const addItem = (type:Item['type']) => {
    const rect = boardRef.current?.getBoundingClientRect();
    const x = rect? rect.width/2 - 40 : 50;
    const y = rect? rect.height/2 - 40 : 50;
    setItems(i=>[...i,{id:Date.now()+Math.random()+'',type,x,y,text:'Edit'}]);
  };

  const onMouseDown = (id:string,e:React.MouseEvent) => {
    setDrag(id);
  };
  const onMouseMove = (e:React.MouseEvent) => {
    if(!drag) return;
    setItems(items=>items.map(it=>it.id===drag?{...it,x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}:it));
  };
  const onMouseUp = () => setDrag(null);

  const exportImg = async () => {
    if(!boardRef.current) return;
    const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
    const canvas = await html2canvas(boardRef.current);
    const link = document.createElement('a');
    link.download = 'grid.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={()=>addItem('text')} className="px-2 py-1 border rounded">Text</button>
        <button onClick={()=>addItem('square')} className="px-2 py-1 border rounded">Square</button>
        <button onClick={()=>addItem('circle')} className="px-2 py-1 border rounded">Circle</button>
        <button onClick={exportImg} className="px-2 py-1 border rounded bg-green-500 text-white">Export</button>
      </div>
      <div
        ref={boardRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className="relative h-96 border bg-[length:20px_20px] bg-[radial-gradient(circle,theme(colors.gray.400)_1px,transparent_1px)]">
        {items.map(it=>(
          <div
            key={it.id}
            onMouseDown={(e)=>onMouseDown(it.id,e)}
            className="absolute select-none cursor-move"
            style={{left:it.x,top:it.y}}
          >
            {it.type==='square' && <div className="w-16 h-16 bg-blue-200"/>}
            {it.type==='circle' && <div className="w-16 h-16 rounded-full bg-red-200"/>}
            {it.type==='text' && <div contentEditable className="p-2 bg-yellow-100 rounded" suppressContentEditableWarning>{it.text}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------- Blank Canvas --------------------
const BlankCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing,setDrawing] = useState(false);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if(ctx) ctx.fillStyle = 'white';
  },[]);

  const start = (e:React.MouseEvent) => {
    setDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if(ctx){
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
    }
  };
  const draw = (e:React.MouseEvent) => {
    if(!drawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if(ctx){
      ctx.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };
  const end = () => setDrawing(false);

  const exportImg = () => {
    const data = canvasRef.current?.toDataURL('image/png');
    if(!data) return;
    const a = document.createElement('a');
    a.download = 'canvas.png';
    a.href = data;
    a.click();
  };

  return (
    <div className="space-y-2">
      <canvas ref={canvasRef} className="border" onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end}></canvas>
      <button onClick={exportImg} className="px-3 py-1 border rounded bg-green-500 text-white">Export</button>
    </div>
  );
};

// -------------------- Code Notebook --------------------
const CodeNotebook: React.FC = () => {
  const [text,setText] = useState('');
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const onKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key==='Tab'){
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const val = el.value;
      el.value = val.substring(0,start)+'\t'+val.substring(end);
      el.selectionStart = el.selectionEnd = start+1;
      setText(el.value);
    }
  };
  const copy = async () => { await navigator.clipboard.writeText(text); };
  const exportTxt = () => {
    const blob = new Blob([text],{type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'code.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div className="space-y-2">
      <textarea ref={areaRef} value={text} onChange={e=>setText(e.target.value)} onKeyDown={onKeyDown} className="w-full min-h-[200px] p-3 border rounded font-mono" />
      <div className="flex gap-2">
        <button onClick={copy} className="px-3 py-1 border rounded bg-gray-200">Copy</button>
        <button onClick={exportTxt} className="px-3 py-1 border rounded bg-gray-200">Download</button>
      </div>
    </div>
  );
};

// -------------------- Sticky Notes Board --------------------
const StickyBoard: React.FC = () => {
  const [items,setItems] = useState<Item[]>([]);
  const [drag,setDrag] = useState<string|null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const addNote = () => {
    const rect = boardRef.current?.getBoundingClientRect();
    const x = rect? rect.width/2 - 50 : 50;
    const y = rect? rect.height/2 - 50 : 50;
    setItems(i=>[...i,{id:Date.now()+Math.random()+'',type:'note',x,y,color:'#ffff88',text:'Edit'}]);
  };
  const remove = (id:string) => setItems(i=>i.filter(it=>it.id!==id));

  const onMouseDown = (id:string) => setDrag(id);
  const onMouseMove = (e:React.MouseEvent) => {
    if(!drag) return;
    setItems(items=>items.map(it=>it.id===drag?{...it,x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}:it));
  };
  const onMouseUp = () => setDrag(null);

  const exportImg = async () => {
    if(!boardRef.current) return;
    const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
    const canvas = await html2canvas(boardRef.current);
    const link = document.createElement('a');
    link.download = 'board.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={addNote} className="px-2 py-1 border rounded">Add Note</button>
        <button onClick={exportImg} className="px-2 py-1 border rounded bg-green-500 text-white">Export</button>
      </div>
      <div ref={boardRef} onMouseMove={onMouseMove} onMouseUp={onMouseUp} className="relative h-96 border bg-gray-50">
        {items.map(it=>(
          <div key={it.id} onMouseDown={()=>onMouseDown(it.id)} className="absolute cursor-move" style={{left:it.x,top:it.y}}>
            <div contentEditable suppressContentEditableWarning className="p-2 rounded shadow" style={{background:it.color}}>{it.text}</div>
            <button onClick={()=>remove(it.id)} className="text-xs">x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------- Reading Mode --------------------
const ReadingMode: React.FC = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`;
  const [fs,setFs] = useState(16);
  const [lh,setLh] = useState(1.6);
  const [theme,setTheme] = useState<'light'|'dark'|'sepia'>('light');
  const [auto,setAuto] = useState(false);
  useEffect(()=>{
    if(!auto) return;
    const id = setInterval(()=>{ window.scrollBy(0,1); },50);
    return ()=>clearInterval(id);
  },[auto]);

  const highlight = () => {
    const sel = window.getSelection();
    if(!sel || sel.rangeCount===0) return;
    const range = sel.getRangeAt(0);
    const mark = document.createElement('mark');
    range.surroundContents(mark);
    sel.removeAllRanges();
  };

  return (
    <div className={`p-4 border rounded space-y-2 ${theme==='dark'?'bg-black text-white':theme==='sepia'?'bg-[#f4ecd8]':''}`} style={{fontSize:fs,lineHeight:lh}}>
      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={()=>setTheme('light')} className="px-2 border rounded">Light</button>
        <button onClick={()=>setTheme('dark')} className="px-2 border rounded">Dark</button>
        <button onClick={()=>setTheme('sepia')} className="px-2 border rounded">Sepia</button>
        <button onClick={()=>setFs(f=>f+1)} className="px-2 border rounded">A+</button>
        <button onClick={()=>setFs(f=>Math.max(12,f-1))} className="px-2 border rounded">A-</button>
        <button onClick={()=>setLh(l=>l+0.1)} className="px-2 border rounded">LH+</button>
        <button onClick={()=>setLh(l=>Math.max(1,l-0.1))} className="px-2 border rounded">LH-</button>
        <button onClick={()=>setAuto(a=>!a)} className="px-2 border rounded">AutoScroll</button>
        <button onClick={highlight} className="px-2 border rounded">Highlight</button>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default MultiSurfaceNotebook;