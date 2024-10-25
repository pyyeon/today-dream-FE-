import React, { useRef } from 'react'; 
import html2canvas from 'html2canvas'; 


const ImageCapture: React.FC = () => {
  
    const captureRef = useRef<HTMLDivElement>(null);


    const handleCapture = async () => {
  
        if (captureRef.current) {
        
            const canvas = await html2canvas(captureRef.current);
           
            const dataUrl = canvas.toDataURL('image/png');

           
            const link = document.createElement('a');
            
            link.href = dataUrl;
           
            link.download = 'captured-image.png';

            
            document.body.appendChild(link);
           
            link.click();
          
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <h1>화면 캡처</h1>
        
            <div ref={captureRef} style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h2>캡처할 내용</h2>
                <p>여기에 캡처할 내용을 작성하세요.</p>
            </div>
           
            <button onClick={handleCapture}>이미지 저장하기</button>
        </div>
    );
};


export default ImageCapture;
