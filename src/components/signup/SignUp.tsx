import React, {useState, useEffect} from 'react';
import {customStyles} from "../../constants/styles.ts";
import {constText, capitalizeFirstLetter} from "../../constants/constants.tsx";
import {useNavigate} from 'react-router-dom';
import {Modal, Button} from "react-bootstrap";
import AlertBootstrap from "../Bootstrap/AlertBootstrap";
import { useMutation } from 'react-query';
import {postSignUp} from "./signUpMutation.ts";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const navigateTo = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    re_email: '',
    password: '',
    re_password: '',
    rut: '',
    gender: 'O',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordRequirements, setPasswordRequirements] = useState<{ requirement: string; fulfilled: boolean }[]>([]);
  const [redirectTimer, setRedirectTimer] = useState(10);
  const signUpMutation = useMutation(postSignUp);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    let newValue = value;
    if (id === 'name' || id === 'surname') {
      newValue = capitalizeFirstLetter(value);
    }

    setFormData({
      ...formData,
      [id]: newValue,
    });

    if (id === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const rePasswordHandleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    if (id === 're_password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (value: string) => {
    let strength = 0;
    const requirements: { requirement: string; fulfilled: boolean }[] = [];

    // Comprobar la longitud mínima
    if (value.length >= 8) {
      strength += 1;
      requirements.push({requirement: "At least 8 characters", fulfilled: true});
    } else {
      requirements.push({requirement: "At least 8 characters", fulfilled: false});
    }

    // Comprobar si contiene números
    if (/\d/.test(value)) {
      strength += 1;
      requirements.push({requirement: "At least one number", fulfilled: true});
    } else {
      requirements.push({requirement: "At least one number", fulfilled: false});
    }

    // Comprobar si contiene mayúsculas
    if (/[A-Z]/.test(value)) {
      strength += 1;
      requirements.push({requirement: "At least one uppercase letter", fulfilled: true});
    } else {
      requirements.push({requirement: "At least one uppercase letter", fulfilled: false});
    }

    // Comprobar si contiene caracteres especiales
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      strength += 1;
      requirements.push({requirement: "At least one special character", fulfilled: true});
    } else {
      requirements.push({requirement: "At least one special character", fulfilled: false});
    }

    // Verificar si las contraseñas coinciden si ambos campos tienen contenido y son idénticos
    if ((value === formData.password && value !== '' && formData.password !== '') ||
        (value === formData.re_password && value !== '' && formData.re_password !== '')
    ) {
      strength += 1;
      requirements.push({requirement: "Passwords match", fulfilled: true});
    } else {
      requirements.push({requirement: "Passwords match", fulfilled: false});
    }

    setPasswordStrength(strength);
    setPasswordRequirements(requirements);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(formData).some(value => value === '');
    if (hasEmptyFields) {
      setError('All fields are required');
      return;
    } else if (formData.email !== formData.re_email) {
      setError('Emails do not match');
      return;
    } else if (formData.password !== formData.re_password) {
      setError('Passwords do not match');
      return;
    } else if (passwordStrength < 5) {
      setError('Password must meet all requirements');
      return;
    } else if (formData.rut.length > 10 || formData.rut.length < 9) {
        setError('Enter a valid RUT (12345678-5)');
        return;
    }
    try {
      const requestData = {
        first_name: formData.name.trim(),
        last_name: formData.surname.trim(),
        rut: formData.rut.trim(),
        email: formData.email.trim(),
        password: formData.password,
        gender: formData.gender,
      };
      const response = await signUpMutation.mutateAsync(requestData);
      if (response.status === 201) {
        setError(null);
        setSuccess(`Account created successfully.
        Check your email to activate your account.
        You will be redirected to the home page in`);
        startRedirectTimer();
        }
    } catch (error) {
      setError(error as string);
    }
  };
  const startRedirectTimer = () => {
    const timer = setInterval(() => {
      setRedirectTimer(prevTime => Math.max(prevTime - 1, 0));
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      navigateTo('/');
    }, redirectTimer * 1000);
  };
  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    const modalContent = document.querySelector('.modal-body');
    if (modalContent) {
      const isAtBottom = modalContent.scrollHeight - modalContent.scrollTop <= modalContent.clientHeight + 1;
      if (isAtBottom) {
        setShowModal(false);
      }
    }
  }

  const handleHomeClick = () => {
    navigateTo('/');
  };

  useEffect(() => {
    const modalContent = document.querySelector('.modal-body');
    if (modalContent) {
      const handleScroll = () => {
        const isAtBottom = modalContent.scrollHeight - modalContent.scrollTop <= modalContent.clientHeight + 1;
        if (isAtBottom) {
          setShowModal(false);
        }
      };
      modalContent.addEventListener('scroll', handleScroll);
      return () => {
        modalContent.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  const isPasswordNotEmpty = () => {
    return formData.password.trim() !== '' && formData.re_password.trim() !== '';
  };
  return (
      <div className={customStyles.customBackground}>
        <div className={"flex flex-col py-2"}>
          <div className={"sm:px-2 md:px-2 lg:px-4 xl:px-10 2xl:px-10"}>
            <h1 className="text-center text-3xl font-bold text-black py-3">Sign up for free</h1>
            <h2 className={"text-lg text-wrap"}>Register now and start exploring your environment</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={customStyles.signUpRow}>
            <div className={customStyles.signUpCol}>
              <label htmlFor="name" className={customStyles.labelText}>Name</label>
              <input
                  type="text"
                  id="name"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"Enter your name"}
                  value={formData.name}
                  onChange={handleInputChange}
              />
            </div>
            <div className={customStyles.signUpCol}>
              <label htmlFor="surname" className={customStyles.labelText}>Surname</label>
              <input
                  type="text"
                  id="surname"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"Enter your surname"}
                  value={formData.surname}
                  onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={customStyles.signUpRow}>
            <div className={customStyles.signUpCol}>
              <label htmlFor="email" className={customStyles.labelText}>Email</label>
              <input
                  type="email"
                  id="email"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"mail@example.com"}
                  value={formData.email}
                  onChange={handleInputChange}
              />
            </div>
            <div className={customStyles.signUpCol}>
              <label htmlFor="re_email" className={customStyles.labelText}>Email</label>
              <input
                  type="email"
                  id="re_email"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"mail@example.com"}
                  value={formData.re_email}
                  onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={customStyles.signUpRow}>
            <div className={customStyles.signUpCol}>
              <label htmlFor="password" className={customStyles.labelText}>Password</label>
              <input
                  type="password"
                  id="password"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"Enter your password"}
                  value={formData.password}
                  onChange={handleInputChange}
              />
            </div>
            <div className={customStyles.signUpCol}>
              <label htmlFor="re_password" className={customStyles.labelText}>Password</label>
              <input
                  type="password"
                  id="re_password"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"Re-enter your password"}
                  value={formData.re_password}
                  onChange={rePasswordHandleInputChange}
              />
            </div>
          </div>
          {isPasswordNotEmpty() && (
              <div className={customStyles.signUpRow}>
                <div className={customStyles.passwordRequirements}>
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped"
                         role="progressbar"
                         aria-label="Basic example"
                         aria-valuenow={passwordStrength}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={{width: `${passwordStrength * 25}%`}}
                    />
                  </div>
                  <ul>
                    {passwordRequirements.map((requirement, index) => (
                        <li key={index} style={{color: requirement.fulfilled ? 'rgb(0,0,0)' : 'rgb(255,0,0)'}}>
                          {requirement.requirement}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
          )}
          <div className={customStyles.signUpRow}>
            <div className={customStyles.signUpCol}>
              <label htmlFor="rut" className={customStyles.labelText}>RUT</label>
              <input
                  type="text"
                  id="rut"
                  className={customStyles.customInput}
                  required={true}
                  placeholder={"12345678-5"}
                  value={formData.rut}
                  onChange={handleInputChange}
              />
            </div>
            <div className={customStyles.signUpCol}>
              <label htmlFor="gender" className={customStyles.labelText}>Gender</label>
              <select
                  required={true}
                  id="gender"
                  className={customStyles.customInput}
                  onChange={handleInputChange}
              >
                <option value="O">Other</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </div>
          </div>
          <div className={customStyles.signUpRow}>
            <div className={customStyles.checkBoxZone}>
              <input
                  type={"checkbox"}
                  id={"conditions"}
                  required={true}
                  onClick={handleShowModal}
              />
              <label htmlFor="conditions" className={customStyles.labelText}>
                I agree to the{' '}
                <a href="#" onClick={handleShowModal}
                   className="text-blue-700 hover:underline hover:underline-offset-2">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {/* INICIO MODAL */}
            <Modal show={showModal} onHide={handleCloseModal} backdrop={"static"} keyboard={false}
                   dialogClassName="modal-dialog-scrollable">
              <Modal.Header>
                <Modal.Title>Terms and Conditions</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {constText.termsAndConditions}
              </Modal.Body>
              <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleCloseModal}
                    className={`${customStyles.customButton} mx-3`}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* FIN MODAL */}
          </div>
          {/* INICIO MENSAJES DE ERROR O EXITO */}
          <div className={customStyles.signUpCol}>
            {error &&
                <AlertBootstrap message={error} variant="danger"/>
            }
          </div>
          <div className={customStyles.signUpCol}>
            {success &&
                <AlertBootstrap message={`${success} ${redirectTimer} seconds.`} variant="primary"/>
            }
          </div>
          {/* FIN MENSAJES DE ERROR O EXITO */}
          <div className="flex flex-col font-bold">
            <div className={"sm:px-8 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mx-4 py-2"}>
              <button
                  type="submit"
                  className={customStyles.customButton}
              >
                Sign Up
              </button>
            </div>
            <a href="" className="hover:underline underline-offset-1 text-center py-2" onClick={handleHomeClick}>Go
              back</a>
          </div>
        </form>
      </div>
  );
}

export default SignUp;