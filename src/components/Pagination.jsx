import React, { useState } from 'react'

const Pagination = ({className, numPages, currentPage, onPageClick, onPrevClick, onNextClick}) => {  
  if(numPages === 0)
    return null
  
  const pageNumbers = []
	for(var i = 0; i < numPages; i++) {
		pageNumbers.push(i)
	}

  return (
    <div className={`flex items-center gap-4 pb-2 ${className}`}>
      <button
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
				onClick={onPrevClick}
			>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
        </svg>
      </button>
      <div className="flex items-center gap-2">
				{pageNumbers.map((num) => (
					<button
            key={num}
						className=
							{`${(num !== currentPage) ? 
								'relative h-10 max-h-[32px] w-10 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' 
								: 
								'relative h-10 max-h-[32px] w-10 max-w-[32px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' } 
							`}
						type="button"
						onClick={() => {
							onPageClick(num)
						}}
					>
						<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
							{num+1}
						</span>
					</button>
				))}
      </div>
      <button
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
				onClick={onNextClick}
			>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
        </svg>
      </button>
    </div>
  )
}

export default Pagination
