import Notes from "./Notes"

const Home = () => {



  return (
    <>
      <h1>Add a note</h1>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your title " />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Description</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Explain your note" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      
      <Notes />
    </>
  )
}

export default Home