import { FormContainer, Form } from './styles'

export const FormComponent: React.FC = () => {
  return (
    <FormContainer>
      <Form>
        <div className="name">
          <label htmlFor="beach_name">Beach Name</label>
          <input
            type="text"
            name="beach_name"
            id="beach_name"
            placeholder="My favorite beach"
          />
        </div>
        <div className="info">
          <div>
            <label htmlFor="beach_lat">latitude</label>
            <input
              type="number"
              name="beach_lat"
              id="beach_lat"
              placeholder="-23.99884"
            />
          </div>
          <div>
            <label htmlFor="beach_lng">longitude</label>
            <input
              type="number"
              name="beach_lng"
              id="beach_lng"
              placeholder="-46.259506"
            />
          </div>
          <div>
            <label htmlFor="beach_position">position</label>
            <select name="beach_position" id="beach_position">
              <option value="w">W</option>
              <option value="w">N</option>
              <option value="w">S</option>
              <option value="w">L</option>
            </select>
          </div>
        </div>
        <div className="btn">
          <button>add beach</button>
        </div>
      </Form>
    </FormContainer>
  )
}
