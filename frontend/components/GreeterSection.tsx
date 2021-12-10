import React from 'react';
import { Button } from 'react-bootstrap';
import CommonSpinner from '../components/CommonSpinner';

interface IGreeterSection {
  greeting: string;
  getGreeting: () => void;
  handleSetName: () => void;
  inputRef: React.Ref<HTMLInputElement>;
  isFetchNameSuccess: boolean;
  isLoadingGreet: boolean;
  isLoadingSetName: boolean;
  errorMessage: string;
}

const GreeterSection: React.FC<IGreeterSection> = ({
  greeting,
  getGreeting,
  handleSetName,
  inputRef,
  isFetchNameSuccess,
  isLoadingGreet,
  isLoadingSetName,
  errorMessage,
}) => (
  <>
    <Button className="m-3" variant="secondary" onClick={getGreeting}>
      Get greeting
    </Button>
    {isLoadingGreet ? <CommonSpinner /> : <div>{greeting}</div>}

    <Button className="m-3" variant="secondary" onClick={handleSetName}>
      Set Greeting
    </Button>
    <div>
      <input ref={inputRef} placeholder="Your name" />
    </div>
    {isLoadingSetName && <CommonSpinner />}
    {isFetchNameSuccess && (
      <div
        className="text-center p-3 text-danger"
        aria-live="assertive"
        aria-atomic="true"
      >
        Name updated
      </div>
    )}
    <div
      className="text-center p-3 text-danger"
      aria-live="assertive"
      aria-atomic="true"
    >
      {errorMessage}
    </div>
  </>
);

export default GreeterSection;
