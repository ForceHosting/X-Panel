import {useEffect, useState} from 'react'

export default function OverheadBanner (){
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch the HTML content from your Cloudflare Worker endpoint
          const response = await fetch('https://worker-super-snow-ec31.scarce.workers.dev/');
          const modifiedHTML = await response.text();
    
          // Update the state with the modified HTML content
          setHtmlContent(modifiedHTML);
        } catch (error) {
          console.error('Error fetching HTML content:', error);
        }
      };
    
      fetchData();
    }, []);

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
    )
}