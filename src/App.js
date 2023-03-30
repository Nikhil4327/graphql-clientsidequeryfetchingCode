// Import everything needed to use the `useQuery` hook
import { useQuery,gql } from '@apollo/client';
const GET_BOOKS = gql`
  query myBooks {
    books {
      id
      name
      password
      email
      by
    }
  }
`;
const GET_TODOS =  gql`
query todos{
  todos{
    userId
    id
    title
    completed
  }
}



`
export default function App() {
   const { data ,error , loading} = useQuery(GET_BOOKS)
   const {data : newData , error : todosError , loading : todosLoading } = useQuery(GET_TODOS)
   let todos = newData && newData.todos && newData.todos.map((todo,index) => {
    if(index < 20){
     return todo
    }
   })
   todos = todos && todos.filter(i => !!i)
  return (
    <>
    {
      error && (
        <div>Error is {error} </div>
      )
    }
    {
      loading && (
        <h1>App is still loading</h1>
      )
    }
    <div>
      {
       data && data.books && data.books.map(({id , name ,password , email , by}) => {
          return(
            <div style = {
              {
                margin : '20px',
                padding :'10px',
                borderRadius: '4px',
                color: 'red',
                backgroundColor : 'yellow',
                display : 'flex',
                flexDirection : 'column',
                justifyContent : 'space-between'
              }
            }>
              <h1> id is {id}</h1>
              <h1> name is {name}</h1>
              <h1> password is {password}</h1>
              <h1> email is {email}</h1>
              <h1> it is written by {by}</h1>
              </div>
          )
         
        })
      }
      <div>
        {
          todos && todos.map(({title , completed})=>{
           return  <div
           style = {
            {
              margin : '20px',
              padding :'10px',
              borderRadius: '4px',
              color: 'red',
              backgroundColor : 'green',
              display : 'flex',
              flexDirection : 'column',
              justifyContent : 'space-between'
            }
          }
           >
            <h1>Task to do is {title}</h1>
            <h1>`Task status is ${completed ? 'completed' : 'not completed'}`</h1>
           </div>
          })
        }
      </div>

      <h2>My first Apollo app 🚀</h2>
    </div>
    </>
  );
}