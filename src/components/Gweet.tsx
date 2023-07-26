import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import React, { useState } from "react";

type IGweetProp = {
  gweetObj: {
    createAt?: number;
    creatorId?: string;
    gweet?: string;
    id?: string;
  };

  isOwner: boolean;
};

export default function Gweet({ gweetObj, isOwner }: IGweetProp) {
  const [editing, setEditing] = useState(false);
  const [newGweet, setNewGweet] = useState(gweetObj.gweet);
  const onDeleteClick = async () => {
    const ok = confirm("정말 이 Gweet을 삭제하시겠습니까?");
    if (ok) {
      // delete gweet
      await deleteDoc(doc(dbService, `gweets/${gweetObj.id}`));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateDoc(doc(dbService, `gweets/${gweetObj.id}`), {
      gweet: newGweet,
    });
    setEditing(false);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setNewGweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Gweet을 수정해보세요"
              value={newGweet}
              onChange={onChange}
              required
            />
            <button>확인</button>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{gweetObj.gweet}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>지우기</button>
              <button onClick={toggleEditing}>수정하기</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
