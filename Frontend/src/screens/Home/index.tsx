import { useEffect , useRef , useState } from "react";
import Draggable from 'react-draggable';


import { ColorSwatch , Group } from "@mantine/core";
import { Button } from "@mantine/core";
import axios from "axios";


import { SWATCHES } from "@/constants";


interface Response{
    expr:string;
    result:string;
    assign:boolean;
}

interface GeneratedResult{
    expression: string;
    answer: string;
}


export default function Home(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing , setIsDrawing] = useState(false);
    const[color , setColor] = useState('rgb(255,255,255)');
    const [reset , setReset] = useState(false);
    const [result , setResult] = useState<GeneratedResult>();
    const [dictOfVars , setDictOfVars] = useState({});//for expressions like x = 5 , x = y
    const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
    const [latexExpression, setLatexExpression] = useState<Array<string>>([]);



    
    useEffect(() => {
        if (latexExpression.length > 0 && window.MathJax) {
            setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
            }, 0);
        }
    }, [latexExpression]);


    

        //for immidiate rendering of result when the result is generated 
        useEffect(() => {
            if (result) {
                renderLatexToCanvas(result.expression, result.answer);
            }
        }, [result]);


        
        //for reset state 
        useEffect(() =>{

            if(reset){
                resetCanvas();
                setLatexExpression([]);
                setResult(undefined);
                setDictOfVars({});
                setReset(false);
            }
        } , [reset]);




    useEffect(() =>{
        const canvas = canvasRef.current;

        if(canvas){
            const ctx = canvas.getContext('2d');

            if(ctx){

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;

                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
    
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;

            }
            
        }




        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.MathJax.Hub.Config({
                tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
            });
        };

        return () => {
            document.head.removeChild(script);
        };

    }, []);




    const startDrawing = (e : React.MouseEvent<HTMLCanvasElement>) =>{

        const canvas = canvasRef.current;

        if(canvas){
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            
            if(ctx){
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX , e.nativeEvent.offsetY);
                setIsDrawing(true);
            }

        }
    };

    const stopDrawing = () =>{
        setIsDrawing(false);
    };


    const draw = (e : React.MouseEvent<HTMLCanvasElement>)  =>{
        if(!isDrawing){
            return;
        }

        const canvas = canvasRef.current;

        if(canvas){
            const ctx = canvas.getContext('2d');

            if(ctx){

                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX , e.nativeEvent.offsetY);
                ctx.stroke();

            }

        }

    };

    const renderLatexToCanvas = (expression: string, answer: string) => {
        const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
        setLatexExpression([...latexExpression, latex]);

        // Clear the main canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

const runRoute = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:7000";
        console.log("running on: " , apiUrl);
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/calculate`,
            data: {
                image: canvas.toDataURL('image/png'),
                dict_of_vars: dictOfVars
            }
        });

        const resp = await response.data;
        console.log("response: " , resp);
        resp.data.forEach((data: Response) => {
            if (data.assign === true) {
                // dict_of_vars[resp.result] = resp.answer;
                setDictOfVars({
                    ...dictOfVars,
                    [data.expr]: data.result
                });
            }
        });

        const ctx = canvas.getContext('2d');
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
            let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    if (imageData.data[i + 3] > 0) {  // If pixel is not transparent
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
            }
            // Instead of calculating based on the drawing, place it at the center of the viewport
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            setLatexPosition({ x: centerX, y: centerY });
            resp.data.forEach((data: Response) => {
                setTimeout(() => {
                    setResult({
                        expression: data.expr,
                        answer: data.result
                    });
                }, 1000);
            });

    }
}


    const resetCanvas  = () =>{

        const canvas = canvasRef.current;

        if(canvas){
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.clearRect(0 , 0 , canvas.width , canvas.height);
            }
        }
    };





    return(
        <>
            <div className='grid grid-cols-3 gap-2'>
                    <Button
                        onClick={() => setReset(true)}
                        className='z-20 !bg-black !text-white'
                        variant='default' 
                        color='black'
                    
                    >
                        Reset
                    </Button>

                    <Group className='z-20'>
                        {SWATCHES.map((swatch) => (
                            <ColorSwatch key={swatch} color={swatch} onClick={() => setColor(swatch)} />
                        ))}
                    </Group>

                    <Button
                        onClick={runRoute}
                        className='z-20 !bg-black !text-white'
                        variant='default' 
                        color='black'
                    >
                        Calculate
                    </Button>

            </div>

            <canvas 
                ref = {canvasRef} 
                id = 'canvas'
                className="absolute top-0 left-0 w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseOut={stopDrawing}
                onMouseUp = {stopDrawing}
                />

            {latexExpression && latexExpression.map((latex, index) => (
                <Draggable
                    key={index}
                    defaultPosition={latexPosition}
                    onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
                >
                    <div className="absolute p-2 text-white rounded shadow-md">
                        <div className="latex-content">{latex}</div>
                    </div>
                </Draggable>
            ))}

        </>

    );
}