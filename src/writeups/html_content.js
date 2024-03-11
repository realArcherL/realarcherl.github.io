import { useEffect, useState } from 'react';

function WrtComp() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('./writeups/html.html')
      .then(response => response.text())
      .then(data => setHtml(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default WrtComp;