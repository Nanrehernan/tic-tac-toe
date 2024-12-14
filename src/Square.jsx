export default function Square({ children, updateBoard, index }) {
   function handleClick() {
    updateBoard(index)
   }

   return (
      <button className="button" onClick={handleClick}>
         <span>{children}</span>
      </button>
   );
}
