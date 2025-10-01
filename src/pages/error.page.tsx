export function ErrorPage() {
  return (
    <div
      className='w-full h-screen box-border p-4 flex flex-col items-center justify-center gap-3 
        bg-background text-muted-foreground'
    >
      <h2 className='text-3x1 text-white/80'>Ops...&#128531;</h2>
      <p className='text-center max-w-[400px] '>
        Desculpe, tivemos um problema.Por favor, tente recarregar a página
      </p>
    </div>
  );
}
