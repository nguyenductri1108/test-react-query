import { useQuery } from "react-query"
import { useParams } from "react-router"
import { getUserById } from "../ApiHooks/homepage"

const UserDetail = () => {
  const {id} = useParams()
  const {data, isLoading} = useQuery(['detailUser', id], ()=>getUserById(id ? id: '1'))

  return (
    <>
      {isLoading ? 'Loading..' : <span>{data?.name} with id:{data?.id} is {data?.age} years old {}</span>   }
    </>
  )
}

export default UserDetail