export default {
	async fetch(
	  request: Request,
	): Promise<Response> {
	  let url = new URL(request.url);
	  let params = url.searchParams;
	  let starAmount = params.get('amount') as unknown as number;
	  let starCount = params.get('count') as unknown as number;
  
	  let star = {
		  full: `
		  <svg xmlns="http://www.w3.org/2000/svg" fill="#ffe234" stroke="#ffe234" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
		  </svg>
		  `,
		  empty: `
		  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffe234" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
		  </svg>
		  `
	  }
  
	  if (starCount === null || starCount === undefined) {
		  return new Response(`Make sure you specify how many stars you want!`)
	  }
	  if (starAmount === null || starAmount === undefined) {
		  return new Response(`Make sure you specify how many stars you want filled in!`)
	  }
	  if (Math.floor(starCount) > starAmount) {
		  return new Response(`You can't have more stars filled in than there are stars!`)
	  }
	  if (starAmount < 0) {
		  return new Response(`You can't have a negative amount of stars!`)
	  }
	  if (starCount < 0) {
		  return new Response(`You can't have a negative amount of stars!`)	
	  }
  
	  
	  const fullStars = Math.floor(starCount);
	  const semiStars = Math.floor(starCount % 1);
	  const totalWidth = starAmount * 24;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="24">`;
	  for (let i = 0; i < fullStars; i++) {
		svg += `<g transform="translate(${i * 24},0)">${star.full}</g>`;
	  }
	  if (starCount % 1 !== 0) {
		  svg += `<g transform="translate(${fullStars * 24},0)">
		  <svg xmlns="http://www.w3.org/2000/svg" fill="#ffe234" stroke="#ffe234" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<defs>
			<linearGradient id="semi-fill" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="${starCount % 1}" style="stop-color:#ffe234; stop-opacity:1" />
				<stop offset="${starCount % 1}" style="stop-color:#ffe234; stop-opacity:0" />
			</linearGradient>
			</defs>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#semi-fill)"/>
		  </svg>
		  </g>`;
	  }
	  for (let i = 0; i < starAmount - fullStars - semiStars; i++) {
		svg += `<g transform="translate(${(fullStars + semiStars + i) * 24},0)">${star.empty}</g>`;
	  }
	  svg += `</svg>`;
  
	 return new Response(svg, {
	   headers: { 'Content-Type': 'image/svg+xml' }
	 });
	  
	}
  }