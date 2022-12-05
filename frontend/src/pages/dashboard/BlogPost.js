import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
// sections
import {
  BlogPostHero,
} from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogPost() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { title } = useParams();

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/api/dev/post/${title}`);
      console.log(title)
      if (isMountedRef.current) {
        setPost(response.data[0]);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, title]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: title },
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.postedOn}
              </Typography>

              <Markdown children={post.postContent} />

            </Box>
          </Card>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}
      </Container>
    </Page>
  );
}
