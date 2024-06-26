import { useEffect } from "react";
import request from "services/request";

function Demos() {
  useEffect(() => {
    const data = request
      .get("get/news", {
        pagenum: 1,
        pagesize: 10,
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h2>Demos Page</h2>
    </div>
  );
}

export default Demos;
