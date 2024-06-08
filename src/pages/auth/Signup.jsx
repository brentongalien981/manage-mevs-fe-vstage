import GuestGuard from "../../components/guards/GuestGuard";

const Signup = () => {
  return (
    <GuestGuard>
      <h3>Signup</h3>
    </GuestGuard>
  );
};

export default Signup;
