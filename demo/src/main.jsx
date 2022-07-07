import { ReactDOM } from "../which-react"
import './index.css'

const jsx = (
  <div className="border">
    <h1>React</h1>
    <a href="https://github.com/peterzhuang/mini-react">mini-react</a>
  </div>
)
ReactDOM.createRoot(document.getElementById('root')).render(jsx)
