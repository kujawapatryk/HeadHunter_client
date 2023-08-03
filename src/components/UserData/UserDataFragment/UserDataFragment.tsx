import { AiFillStar } from 'react-icons/ai';

import './UserDataFragment.scss';

interface Props {
  header: string;
  value: string;
  showStars?: boolean,
  type?: boolean,
  width: string,
}
export const UserDataFragment = ({ header, value, showStars = false, type, width }: Props) => {

    const [valueStart, restOfValue] = value.split('/');
    return (
        <div className="user-data-fragment__container" style={{ width: `${width}` }}>
            <h4 className={`user-data-fragment__header ${type && 'user-data-fragment__header-cv'}`}>{header}</h4>
            <div>
                <h4 className="user-data-fragment__value">
                    {value.includes('/') ? (
                        <>
                            {valueStart}
                            <span className="user-data-fragment__value--dark">/{restOfValue}</span>
                        </>
                    ) : (
                        value
                    )}
                </h4>
                {showStars && value.includes('/') && (
                    <div className="user-data-fragment__stars">
                        {Array.from({ length: Number(restOfValue) }, (_, i) => (
                            <AiFillStar
                                size={20}
                                className={`user-data-fragment__star--${i < Number(valueStart) ? 'red' : 'gray'}`}
                                key={i}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
