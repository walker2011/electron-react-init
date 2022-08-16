import { PageContainer } from '@ant-design/pro-components';
import UploadComponent from './upload/UploadComponent';
import { useState } from 'react';

export default function ImagePageContainer() {
    const [imageUrl, setImageUrl] = useState<string>();
    return (
        <PageContainer>
            <UploadComponent imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </PageContainer>
    );
}
