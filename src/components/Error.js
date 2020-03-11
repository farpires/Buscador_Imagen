import React from 'react';
 

const Error = ({mensaje}) => {
    return (
        <p className="my-3 p-4 text-center text-black-50 alert alert-primary">{mensaje}</p>
      );
}
 
export default Error;