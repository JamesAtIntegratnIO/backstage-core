/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { useAsync } from 'react-use';
import { Typography } from '@material-ui/core';
import { CodeSnippet, InfoCard, useApi } from '@backstage/core';
import { ENTITY_DEFAULT_NAMESPACE } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';
import { badgesClientApiRef } from '../BadgesClientApi';

export const EntityBadgesCard = () => {
  const badgesClientApi = useApi(badgesClientApiRef);
  const { entity } = useEntity();
  const { value, loading, error } = useAsync(async () => {
    return {
      badge: await badgesClientApi.getEntityPoweredByBadgeURL(entity),
      markdown: await badgesClientApi.getEntityPoweredByMarkdownCode(entity),
    };
  }, [badgesClientApi, entity]);

  return (
    <InfoCard title="Badges">
      <Typography paragraph>
        Paste the following snippet in your <code>README.md</code> or other
        markdown file, to get a powered by backstage badge:
      </Typography>
      {value && <img src={value.badge} alt="Powered by Backstage badge" />}
      {value && <CodeSnippet text={value.markdown} showCopyCodeButton />}
    </InfoCard>
  );
};
