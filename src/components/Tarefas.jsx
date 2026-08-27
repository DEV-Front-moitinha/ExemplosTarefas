import {useState,useEffect} from "react"

const Tarefas = () => {

    //HOOK-useState - manipula o estado da variavel e guarda os dados
    const [tarefas,setTarefas]=useState(()=>{
    const salvarTarefa = localStorage.getItem("item-tarefa")
    return salvarTarefa ? JSON.parse(salvarTarefa): [];
    })
    const [campo,setCampo]=useState("");

    //HOOK-useEffect - realiza um efeito colateral, no exemplo
    //vai carregar automaticamente as tarefas cadastradas

    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas])

  return (
    
    <>
    
    </>
  )
}

export default Tarefas
