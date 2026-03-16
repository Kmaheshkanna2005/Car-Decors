import { useEffect, useState } from "react";
import axios from "axios";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .pp-root { min-height:100vh; background:#0c0c0c; font-family:'DM Sans',sans-serif; color:#e0e0e0; padding:48px; }

  .pp-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:20px;}

  .pp-title{font-family:'Bebas Neue';font-size:48px;letter-spacing:4px;color:#fff;}
  .pp-title span{color:#b8860b;}

  .pp-header-right{display:flex;align-items:center;gap:16px;}

  .pp-search-wrap{position:relative;}
  .pp-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#555;font-size:14px;}

  .pp-search{
    background:#141414;border:1px solid #2a2a2a;border-radius:8px;
    padding:12px 18px 12px 40px;color:#fff;font-size:14px;width:260px;
  }

  .pp-cart-btn{
    padding:12px 22px;background:linear-gradient(135deg,#b8860b,#8b6508);
    border:none;border-radius:8px;color:#fff;font-family:'Bebas Neue';
    font-size:15px;letter-spacing:2px;cursor:pointer;
  }

  .pp-back-btn{
    padding:11px 20px;background:#141414;border:1px solid #2a2a2a;
    border-radius:8px;color:#888;font-size:13px;cursor:pointer;
  }

  .pp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:24px;}

  .pp-card{background:#141414;border:1px solid #1e1e1e;border-radius:12px;overflow:hidden;}

  .pp-card-img-wrap{width:100%;height:160px;background:#1a1a1a;}
  .pp-card-img{width:100%;height:100%;object-fit:cover;}

  .pp-card-category{
    position:absolute;top:10px;left:10px;background:rgba(0,0,0,.75);
    border:1px solid rgba(184,134,11,.4);border-radius:20px;
    padding:3px 10px;font-size:10px;color:#b8860b;
  }

  .pp-card-body{padding:18px 20px;}

  .pp-card-name{font-size:16px;font-weight:600;color:#fff;margin-bottom:10px;}

  .pp-card-meta{display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px;}

  .pp-stock-badge{padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;}
  .pp-stock-ok{background:rgba(34,197,94,.1);color:#4ade80;}
  .pp-stock-low{background:rgba(239,68,68,.1);color:#f87171;}

  .pp-card-price{font-family:'Bebas Neue';font-size:26px;color:#b8860b;margin:12px 0;}

  .pp-card-footer{display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap;}

  .pp-qty-input{
    width:60px;padding:7px;background:#1e1e1e;border:1px solid #2a2a2a;
    border-radius:6px;color:#fff;font-size:13px;
  }

  .pp-add-btn,.pp-edit-btn{
    flex:1;padding:8px;background:#1e1e1e;border:1px solid #2a2a2a;
    border-radius:6px;color:#ccc;font-size:13px;cursor:pointer;
  }

  .pp-add-btn:hover{background:linear-gradient(135deg,#b8860b,#8b6508);color:#fff;}
  .pp-edit-btn:hover{background:#2a2a2a;color:#fff;}

  .pp-empty{text-align:center;padding:80px 40px;color:#555;}
`;

const PartsPage = () => {

  const [parts,setParts] = useState([]);
  const [quantities,setQuantities] = useState({});
  const [search,setSearch] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchParts = async () => {
    try{
      const res = await axios.get("http://localhost:5000/api/parts",{
        headers:{Authorization:`Bearer ${token}`}
      });
      setParts(res.data);
    }catch{
      alert("Failed to load parts");
    }
  };

  useEffect(()=>{fetchParts();},[]);

  const handleQuantityChange=(id,value)=>{
    setQuantities({...quantities,[id]:value});
  };

  const addToCart = async(id)=>{
    try{
      const quantity = quantities[id] || 1;

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {partId:id,quantity:Number(quantity)},
        {headers:{Authorization:`Bearer ${token}`}}
      );

      alert("Added to cart");
    }catch{
      alert("Failed to add to cart");
    }
  };

  const increaseStock = async(id)=>{
    const quantity = prompt("Enter quantity to add:");
    if(!quantity || quantity<=0){alert("Invalid quantity");return;}

    try{
      await axios.patch(
        `http://localhost:5000/api/parts/${id}/increase`,
        {quantity:Number(quantity)},
        {headers:{Authorization:`Bearer ${token}`}}
      );

      alert("Stock updated");
      fetchParts();
    }catch{
      alert("Failed to update stock");
    }
  };

  const setStock = async(id)=>{
    const newStock = prompt("Enter correct stock quantity:");
    if(!newStock) return;

    try{
      await axios.patch(
        `http://localhost:5000/api/parts/${id}/set-stock`,
        {stock:Number(newStock)},
        {headers:{Authorization:`Bearer ${token}`}}
      );

      alert("Stock corrected");
      fetchParts();
    }catch{
      alert("Failed to update stock");
    }
  };

  const filtered = parts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return(
  <>
  <style>{CSS}</style>

  <div className="pp-root">

    <div className="pp-header">
      <div className="pp-title">Parts <span>Inventory</span></div>

      <div className="pp-header-right">

        <div className="pp-search-wrap">
          <span className="pp-search-icon">🔍</span>
          <input
            className="pp-search"
            placeholder="Search parts..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        {role==="staff" && (
          <button className="pp-cart-btn" onClick={()=>window.location.href="/cart"}>
            🛒 Cart
          </button>
        )}

        <button className="pp-back-btn"
          onClick={()=>window.location.href = role==="admin" ? "/admin" : "/staff"}>
          ← Back
        </button>

      </div>
    </div>

    <div className="pp-grid">

      {filtered.length===0 && (
        <div className="pp-empty">No parts found</div>
      )}

      {filtered.map(part=>(
        <div className="pp-card" key={part._id}>

          <div className="pp-card-img-wrap">
            <img
              className="pp-card-img"
              src={`http://localhost:5000/${part.image}`}
              alt={part.name}
            />
          </div>

          <div className="pp-card-body">

            <div className="pp-card-name">{part.name}</div>

            <div className="pp-card-meta">
              <span>Stock</span>
              <span className={`pp-stock-badge ${part.stock>5?"pp-stock-ok":"pp-stock-low"}`}>
                {part.stock}
              </span>
            </div>

            <div className="pp-card-price">₹{part.price}</div>

            <div className="pp-card-footer">

              {role==="staff" && (
                <>
                  <input
                    className="pp-qty-input"
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={quantities[part._id] || ""}
                    onChange={(e)=>handleQuantityChange(part._id,e.target.value)}
                  />

                  <button
                    className="pp-add-btn"
                    onClick={()=>addToCart(part._id)}
                  >
                    Add
                  </button>
                </>
              )}

              {role==="admin" && (
                <>
                  <button
                    className="pp-edit-btn"
                    onClick={()=>window.location.href=`/edit-part/${part._id}`}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="pp-edit-btn"
                    onClick={()=>increaseStock(part._id)}
                  >
                    ➕ Add
                  </button>

                  <button
                    className="pp-edit-btn"
                    onClick={()=>setStock(part._id)}
                  >
                    🔧 Set
                  </button>
                </>
              )}

            </div>
          </div>

        </div>
      ))}

    </div>

  </div>
  </>
  );
};

export default PartsPage;