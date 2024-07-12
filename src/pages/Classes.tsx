import { useSelector } from "react-redux";
import { selectClasses } from "../store/Classes";
import { Col, Row } from "antd";
import { ClassSummary } from "../components/ClassSummary";

export function Classes() {
  const classes = useSelector(selectClasses);
  const classKeys = Object.keys(classes);

  return (
    <div className="classes-container">
      {classKeys.map((key, index) => {
        if (index % 3 === 0) {
          return (
            <Row className="classes-row-container">
              <Col className="class-col" span={8}>
                <ClassSummary
                  classInfo={classes[classKeys[index]]}
                ></ClassSummary>
              </Col>
              <Col className="class-col" span={8}>
                <ClassSummary
                  classInfo={classes[classKeys[index + 1]]}
                ></ClassSummary>
              </Col>
              <Col className="class-col" span={8}>
                <ClassSummary
                  classInfo={classes[classKeys[index + 2]]}
                ></ClassSummary>
              </Col>
            </Row>
          );
        }
      })}
    </div>
  );
}

export default Classes;
