
// PHP implementation to find  
// the number closest to n and 
// divisible by m  
  
// function to find the number  
// closest to n and divisible by m  
function closestNumber(n, m)  
{  
    // find the quotient  
    let q = Math.round(n / m);  
      
    // 1st possible closest number  
    let n1 = m * q;  
      
    // 2nd possible closest number  
    let n2 = (n * m) > 0 ?  
        (m * (q + 1)) : (m * (q - 1));  
      
    // if true, then n1 is the  
    // required closest number  
    if (Math.abs(n - n1) < Math.abs(n - n2))  
        return n1;  
      
    // else n2 is the required  
    // closest number  
    return n2;  
}  
  
// Driver Code 
  

  
// This code is contributed by jit_t 
