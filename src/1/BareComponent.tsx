import './BareComponent.css';

function BareComponent({ backgroundColor = 'green-background' }) {
  return (
    <div>
      <p className={backgroundColor}>Bare Component</p>
    </div>
  );
}
export default BareComponent;
