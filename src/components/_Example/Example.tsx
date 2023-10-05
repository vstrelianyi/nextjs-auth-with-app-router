'use client';

// STYLES
import styles from './Example.module.scss';
import classNames from 'classnames';

type TProps = {
	className?: string,
}

const Example = ( { className, }: TProps ) => {

  return (
    <div className={ classNames( [
      styles.Example,
      className,
    ] )
    }>
      <h1>Example component</h1>
    </div>
  );
};

export default Example;