import { useEffect, useState, useRef } from "react";
import { Button, Divider, Table, Modal } from "antd";
import {
  EditFilled,
  CloseCircleFilled,
  SaveFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Contacts = (owner) => {
  const { username } = useSelector((state) => state);
  const [book, setBook] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalVis, setModalVis] = useState(false);

  const name = useRef();
  const phone = useRef();

  useEffect(() => {
    getBook(username);
  }, []);

  const getBook = (owner) => {
    const localBook = localStorage.getItem("book");
    console.log("bookOnLoad->", localBook);
    if (localBook !== null) setBook(JSON.parse(localBook));
  };

  const saveToBook = (owner) => {
    book !== null
      ? setBook((oldState) => [
          ...oldState,
          {
            owner,
            personal: name.current.value,
            phone: phone.current.value,
            key: Math.random(),
          },
        ])
      : setBook([
          {
            owner,
            personal: name.current.value,
            phone: phone.current.value,
            key: Math.random(),
          },
        ]);
    localStorage.setItem("book", JSON.stringify(book));
    console.log(book);
  };

  const removeItem = (key) => {
    setBook(book.filter((el) => el.key !== key));
    return localStorage.setItem("book", JSON.stringify(book));
  };

  const editItem = (item) => {
    return setCurrentItem(item);
  };

  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
    },
    {
      title: "Name",
      dataIndex: "personal",
    },
    {
      title: "Phone #",
      dataIndex: "phone",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setModalVis(true);
              editItem(record);
            }}
          >
            <EditFilled />
            Edit
          </a>
          <span> | </span>
          <a onClick={() => removeItem(record.key)}>
            <CloseCircleFilled /> Delete
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <b>Name: </b>
      <input type="text" class="ant-input ant-input-lg" ref={name} />
      <br />
      <b>Phone #: </b>
      <input type="tel" class="ant-input ant-input-lg" ref={phone} />
      <br />
      <br />

      <Button
        type="primary"
        size="large"
        icon={<PlusSquareFilled />}
        onClick={() => saveToBook(username)}
      >
        Add
      </Button>
      <span> </span>
      <Button
        type="primary"
        size="large"
        icon={<SaveFilled />}
        onClick={() => localStorage.setItem("book", JSON.stringify(book))}
      >
        Save
      </Button>
      <Divider />
      <Table dataSource={book} columns={columns} />

      <Modal
        visible={modalVis}
        title="Edit contact"
        onCancel={() => setModalVis(false)}
        onOk={() => {
          setModalVis(false);
          setBook(
            book.map((el) => {
              console.log(el, currentItem);
              return el.key == currentItem.key ? currentItem : el;
            })
          );
        }}
      >
        {currentItem && (
          <div key={currentItem.key}>
            <b>Name: </b>
            <input
              type="text"
              class="ant-input ant-input-lg"
              onChange={(event) =>
                setCurrentItem((state) => {
                  return {
                    ...state,
                    personal: (state.personal = event.target.value),
                  };
                })
              }
              defaultValue={currentItem.personal}
            />
            <br />
            <b>Phone #: </b>
            <input
              type="tel"
              class="ant-input ant-input-lg"
              onChange={(event) =>
                setCurrentItem((state) => {
                  return {
                    ...state,
                    phone: (state.phone = event.target.value),
                  };
                })
              }
              defaultValue={currentItem.phone}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default Contacts;
