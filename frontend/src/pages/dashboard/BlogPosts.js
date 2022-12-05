import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------


export default function BlogPosts() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/dev/posts/all');

      if (isMountedRef.current) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Blog"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'Posts' },
          ]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) =>
            (
              <Grid key={post._id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
              )
          )}
        </Grid>
      </Container>
    </Page>
  );
}
