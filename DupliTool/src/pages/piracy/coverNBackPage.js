import "./index.css"

export const CoverAndBackPage = () => {
  return (
    <div className="" style={{textAlign:"left", margin:"5rem", marginRight:"9rem"}}>
        <h1 className="font-lg">Cover and Back Page Detection</h1>
        <h2 className="font-sm file-upload">Choose the Files</h2>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
            <label className="label-img">Cover Page</label>
          <input type="file"/>
          </div>

          {/* {imagePath && (
            <img
              style={{ width: 300 }}
              src={imagePath}
              alt="Form-bannner"
            />
          )} */}
          <div>
          <label className="label-img">Back Page</label>
          <input type="file"/>
          </div>
        </div>
        <div className="form-btn">
          <button className="hero-btn">
            Next{" "}
          </button>
        </div>
      </div>
  )
};
