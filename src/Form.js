const Form = () => {
  return (
    <div>
      <h1>Form</h1>
      <input type="text" placeholder="Enter First name" />
      <input type="text" placeholder="Enter Last name" />
      <input type="date" placeholder="Enter Your Age" />
      <input type="text" placeholder="Enter Your Gender" />
      <input type="number" min="1" max="12" placeholder="Enter a Number" />
    </div>
  );
};

export default Form;
