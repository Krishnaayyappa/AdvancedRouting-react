import { Form, Link, useActionData, useSearchParams, useNavigation } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const data = useActionData();
  const isLogin = searchParams.get("mode") === "login"
  const isSubmitting = navigation.state === 'submitting' 

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {data && data.errors && (<ul>
            {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
          </ul>)}
        {data && data.message && <p>{data.message}</p>}
        <div className={classes.actions}>
          <Link to = {`?mode=${isLogin ? "signup":"login"}`}>
                {isLogin?"Createnewuser":"Login"}
          </Link>
          <button>{isSubmitting ? (isLogin ? "logging in...": "creating user..."):"Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;