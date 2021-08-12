import styled from "@emotion/styled";
import { forwardRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Header, Icon, Ref, Segment } from "semantic-ui-react";

function ImageDropzone({ onAdd }) {
  const [isDragging, setIsDragging] = useState(false);
  const onDragOver = () => setIsDragging(true);
  const onDragLeave = () => setIsDragging(false);
  const onDrop = acceptedFiles => {
    if (acceptedFiles.length === 1) {
      onAdd(acceptedFiles[0]);
    }
    onDragLeave();
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDragLeave,
    onDragOver,
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: 'image/*'
  });

  return (
    <DropzoneSegment {...getRootProps()} dragging={isDragging}>
      <Header icon>
        <Icon name="picture" />
        Drop your image here...
      </Header>
      <Button primary>Add image</Button>
      <input {...getInputProps()} />
    </DropzoneSegment>
  );
}

const DropzoneSegment = styled(
  forwardRef(({ dragging, ...props }, ref) => (
    <Ref innerRef={ref}>
      <Segment placeholder {...props} tertiary={dragging} />
    </Ref>
  ))
)`
  cursor: pointer;
`;

export default ImageDropzone;
