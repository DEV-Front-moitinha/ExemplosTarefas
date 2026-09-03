import { useState, useEffect } from 'react'

const Tarefas = () => {

    //HOOK-useState - manipula o estado da variavel e guarda os dados
    const [tarefas, setTarefas] = useState(() => {
    const salvarTarefas = localStorage.getItem("item-tarefa");
    return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });
    //useState para manipular os dados que passar nos campos
    const [campo, setCampo] = useState("");

    //HOOK-useEffect- realiza um efeito colateral, no exemplo vai 
    //carregar automaticamente as tarefas cadastradas.

    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    }, [tarefas])

    //função adicionar tarefa

    const AdicionarTarefa = (e) => {
        //VALIDA O CARREGAMENTO 
        e.preventDefault();
        if (!campo.trim()) return;

        //IBJETO NOVA TAREFA
        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };

        //SPREAD - PEGA O VALOR ANTERIOR E ADICIONA O NOVO VALOR
        setTarefas([...tarefas, novaTarefa]);
        //LIMPA A TELA
        setCampo();
    };

    //FUNÇÃO PARA REMOVER TAREFA
    const RemoverTarefa = (id) => {
        //COMPARA O ID QUE DESEJA REMOVER COM QUE ESTÁ NO ARRAY
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa)
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-10 bg-blue-200 rounded-4xl shadow-lg border border-blue-950">
                <h2 className="text-2xl font-bold text-black mb-10 text-center">Minha Lista de Tarefas</h2>

                <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-10">
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="flex-1 px-4 border border-black rounded-4xl focus:outline-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-950"
                    />
                    <button type="submit" className="bg-blue-300 hover:bg-blue-500 fonte-medium px-2 border border-black rounded-2xl transition-colors cursor-pointer">
                        Adicionar
                    </button>
                </form>

                <ul className="space-y-3">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="flex items-center justify-around p-3 bg-blue-300 border border-black rounded-2xl shadow-xl hover:bg-blue-500 transition-colors">
                            <span>{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button onClick={() => RemoverTarefa(tarefa.id)}
                                className="bg-blue-200 hover:bg-blue-300 font-medium px-3 py-1 rounded-2xl transition-colors cursor-pointer"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>

                {tarefas.length === 0 && <p className="mensagem">Nenhuma tarefa salva.</p>}
            </div>

        </>
    )
}

export default Tarefas
