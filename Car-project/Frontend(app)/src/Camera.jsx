import React from 'react';


function Camera (){
    const handleScreen = async () => {
        try {
          const response = await fetch('http://localhost:8000/ss');
          if (!response.ok) throw new Error('Failed to fetch');
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          /* temporary url in browser*/
          const a = document.createElement("a");
          a.href = url;
          a.download = "Screenshot.jpg"
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }
        catch(err){
            console.error(err);
        }
    }


return(
<>
<img className='camera' src="http://localhost:8000/video" alt="Live Stream"/> 
<div>
<button onClick={handleScreen} className='ssButtons'> Screenshot </button>
</div> 

</>
);

}
export default Camera;