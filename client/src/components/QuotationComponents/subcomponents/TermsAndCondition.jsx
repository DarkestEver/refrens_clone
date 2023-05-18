import { CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";

import { useState } from "react";

function TermsAndCondition() {
    const [terms, setTerms] = useState([
        { id: 1, value: "Applicable taxes will be extra." },
        { id: 2, value: "Work will resume after advance payment." },
      ]);
    
      const addNewTerm = () => {
        const newTermId = terms.length + 1;
        const newTerm = { id: newTermId, value: "" };
        setTerms([...terms, newTerm]);
      };
    
      const deleteTerm = (termId) => {
        const updatedTerms = terms.filter((term) => term.id !== termId);
        setTerms(updatedTerms);
      };
    
      const handleTermChange = (event, termId) => {
        const updatedTerms = terms.map((term) => {
          if (term.id === termId) {
            return { ...term, value: event.target.value };
          }
          return term;
        });
        setTerms(updatedTerms);
      };
    
    return (
        <>
            <div className="gst-container">
                <ol style={{paddingLeft: '1.5rem'}} >
                
                    {terms.map((term) => (
                        <li key={term.id} style={{marginBottom:'1rem'}}>
                        <input
                            placeholder="Add terms"
                            className="tac-input"
                            value={term.value}
                            onChange={(event) => handleTermChange(event, term.id)}
                        />
                        <CloseOutlined onClick={() => deleteTerm(term.id)} />
                        </li>
                    ))}
                    
                </ol>

                <div className="tac-new-btn" onClick={addNewTerm}>
                    <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                    Add new Term
                </div>
            </div>
        </>
    )
    
}

export default TermsAndCondition;