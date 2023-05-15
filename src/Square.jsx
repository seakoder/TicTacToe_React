
function Square({value,onSquareClick}) {

    return (
        <>
        <button style={{backgroundColor: 'maroon', border:'none', height:'100px', width:'100px', marginLeft:'10px', marginTop:'10px', borderRadius:'10px', color:'white', fontSize:'50px', fontWeight:'bold'}} onClick={onSquareClick} >{value}</button>
        </>
    )
}

export default Square;