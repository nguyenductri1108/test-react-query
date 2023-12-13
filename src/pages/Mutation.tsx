import { useMutation, useQuery, useQueryClient } from "react-query"
import { addUser, getUser } from "../ApiHooks/homepage"
import { Link } from "react-router-dom"
import { useRef } from "react"

const MutationPage : React.FC = () => {
  const {data} = useQuery('mutate', getUser)
  const {data: users, refetch} = useQuery('user', getUser )
  const nameInputRef = useRef<HTMLInputElement>(null)
  const ageInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const {mutate} = useMutation(addUser, {onSuccess: ()=>{
    console.log('hehe')
    
    queryClient.invalidateQueries('user')
  }})
  return (
    <>
      <div style={{display: 'flex'}}>
        <input ref={nameInputRef} name="name"></input>
        <input ref={ageInputRef} name="age"></input>
        <button onClick={()=>{
          const user = { name: nameInputRef.current?.value || 'abc', age: Number(ageInputRef.current?.value) || 12}
          mutate(user)
        }}>Add</button>
      </div>
      <button onClick={()=>{
          refetch()
      }}>Refetch users</button>
      <ul>
        {users?.map((item,i)=>{
          return <li><Link to={`/user-detail/${item.id}`}>{item.name}</Link></li>
        })}
        
      </ul>
    </>
  )
}

export default MutationPage