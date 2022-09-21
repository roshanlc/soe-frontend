import './style.css'
export const Form=({onSubmit})=>{

    return(
        <form onSubmit={onSubmit}>
            

            <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input className='form-control' id='title' placeholder='' required />
            </div>
            <div className='form-group'>
                <label htmlFor='content'>Content</label>
                <input className='form-control' id='content' placeholder='' required />
            </div>

            <div className='form-group'>
                <label htmlFor='content'>File</label>
                <input className='form-control' id='file' type='file' placeholder=''  />
            </div>



                <div className='form-group inline'>
                <button className='form-control btn btn-primary' type='submit' id='submit'>
                    Submit
                </button>
            </div>
                

           
        </form>
    )


}
export default Form;
