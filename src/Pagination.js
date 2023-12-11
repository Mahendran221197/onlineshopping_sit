import { useState } from "react"

function Pagination({  records, update, prev, next, index,activePage }) {
    let n = records
    let pages = []
    for (let i = 1; i <= n; i++) {
        pages.push(i)

    }
    // const [active, setActive] = useState(1)
    // const change = (n) => {
    //     setActive(n)
    // }

    return (
        <div>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={prev}>Prev</a>
                </li>
                {pages.map((p,index) => (
                    <li className={`page-item ${activePage === p ? "active" : ""}`} key={index}>
                        <a href="#" className="page-link" onClick={() => { update(p) }}>{p}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>
            </ul>

        </div>
    )
}
export default Pagination;