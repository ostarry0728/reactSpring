import React from "react";
import { Link } from "react-router-dom";
function GuestbookItem({ idx, name, email, passwd, contents, post_date }) {
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    //contents 줄바꿈 처리
    contents = contents.replaceAll("\n", "<br/>");
    return (
      <tr key={idx}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{post_date}</td>
        <td>
          <Link to={`/guestbook/detail/${idx}`}>
            <span dangerouslySetInnerHTML={{ __html: contents }} />
          </Link>
        </td>
      </tr>
    );
  }
}
export default GuestbookItem;
