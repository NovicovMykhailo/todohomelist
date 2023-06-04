import css from './Tost.module.css'



const Tost = ({ message }) => {
  return (
    <div className={css.toastContainer}>
      <h3 className={css.toastTitle}>Info</h3>
      <p className={css.toastMessage}>{message}</p>
    </div>
  );
};

export default Tost;


