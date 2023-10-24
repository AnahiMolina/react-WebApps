import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'

export default function ToDo() {
  const lista = localStorage.getItem('tareas')
  const [tareas, setTareas] = useState(JSON.parse(lista) || [])
  const input = useRef()
  const borrar =useRef()


  const agregar_tarea = (e) =>{
    let texto = input.current.value
    if (texto.length != ''){
      setTareas([...tareas,texto])
      input.current.value=''
      input.current.focus()
      localStorage.setItem('tareas',JSON.stringify([...tareas,texto]))
    }
  }


  const limpiar_tareas = (e) =>{
    localStorage.clear()
    setTareas([])
  }


  const eliminar_tarea = (e) =>{
    let lista =tareas.filter((tarea,index) =>{
      return index != e
    })   
    setTareas(lista)
    localStorage.setItem('tareas',JSON.stringify(lista))
  }


  return (
    <div>
      <Navbar />
      <div className='text-center'>
        <h1>Lista de tareas</h1>
      </div>

      <div className='container'>
        <div className='row mt-3'>
          <div className='col-3'>
            <input ref={input} type='text' placeholder='Nueva tarea' className='form-control' />
            <button onClick={agregar_tarea} className='btn btn-secondary w-100 mt-3'>
              <i className='bx bx-plus'/> Agregar
            </button>
            <button onClick={limpiar_tareas} className='btn btn-warning w-100 mt-3'>
            <i className='bx bx-trash'/> Eliminar
            </button>
          </div>
          <div className='col-9'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Tarea</th>
                  <th className='w-25'>Editar</th>
                  <th className='w-25'>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {tareas.length == 0 ?
                  <tr>
                    <td className='text-center text-secondary' colSpan='3'>No hay tareas</td>
                  </tr>
                  :
                  tareas.map((tarea,index) => 
                  <tr key={index}>
                    <td>{tarea}</td>
                    
                    <td>
                      <button className='btn btn-primary'>
                        <i className='bx bx-pencil' />
                      </button>
                    </td>

                    <td>
                      <button onClick={ e => eliminar_tarea(index)} className='btn btn-warning'>
                        <i className='bx bx-trash' />
                      </button>
                    </td>

                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
