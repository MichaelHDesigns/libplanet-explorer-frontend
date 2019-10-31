import React, { useState } from 'react';
import { css } from 'emotion';
import { navigate } from 'gatsby';
import { Checkbox, DefaultButton, Link } from 'office-ui-fabric-react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Block, BlockListComponent } from '../generated/graphql';
import useSearchParams from '../misc/useSearchParams';
import { NavBar } from '../components/Layout';
import Wrapper from '../components/Wrapper';

interface IndexPageProps {
  location: Location;
}

const POLL_INTERVAL = 2000;

const IndexPage: React.FC<IndexPageProps> = ({ location }) => {
  const limit = 21;
  const [searchParams, setSearchParams] = useSearchParams(location);
  const { offset = 0 } = searchParams;
  const setOffset = (offset: number) => {
    if (offset < 1) {
      const newSearchParams = { ...searchParams };
      delete newSearchParams.offset;
      setSearchParams(newSearchParams);
    } else {
      setSearchParams({ ...searchParams, offset });
    }
  };
  const olderHandler = () => {
    setOffset(+offset + limit);
  };
  const newerHandler = () => {
    setOffset(+offset - limit);
  };
  const [excludeEmptyTxs, setExcludeEmptyTxs] = useState(false);
  return (
    <>
      <NavBar className="ms-bgColor-white" />
      <Wrapper>
        <Checkbox
          label="Include blocks having any tx"
          checked={excludeEmptyTxs}
          onChange={(_, checked) => {
            setExcludeEmptyTxs(!!checked);
          }}
        />
        <BlockListComponent
          variables={{ offset, limit, excludeEmptyTxs }}
          pollInterval={POLL_INTERVAL}>
          {({ data, loading, error }) => {
            if (error) return <p>error!</p>;

            const timestamps: Date[] | null =
              data && data.blocks
                ? data.blocks.map(block => new Date(block!.timestamp))
                : null;

            let interval: number | null = timestamps ? 0 : null;
            if (interval != null && timestamps) {
              for (let i = 0; i < timestamps.length - 1; i++) {
                interval += +timestamps[i] - +timestamps[i + 1];
              }
              interval /= (timestamps.length - 1) * 1000;
            }

            const difficulties: number[] | null =
              data && data.blocks
                ? data.blocks.map(block => block!.difficulty)
                : null;
            let difficulty = 0;
            if (difficulty != null && difficulties) {
              difficulty =
                difficulties.reduce((d, sum) => d + sum, 0) /
                difficulties.length;
            }
            return (
              <>
                <p key="interval">
                  Average interval in this page: {interval} sec
                </p>
                <p key="difficulty">
                  Average difficulty in this page: {difficulty}
                </p>
                <DefaultButton
                  onClick={newerHandler}
                  disabled={loading || offset < 1}
                  className={css`
                    margin-right: 5px;
                  `}>
                  &larr; Newer
                </DefaultButton>
                <DefaultButton disabled={loading} onClick={olderHandler}>
                  Older &rarr;
                </DefaultButton>
                {loading ? (
                  <p>Loading&hellip;</p>
                ) : (
                  <BlockList
                    blocks={
                      loading ? [] : (data!.blocks as NonNullable<Block[]>)
                    }
                  />
                )}
              </>
            );
          }}
        </BlockListComponent>
      </Wrapper>
    </>
  );
};

interface BlockListProps {
  blocks: Pick<Block, 'hash' | 'index' | 'timestamp' | 'difficulty'>[];
}

const BlockList: React.FC<BlockListProps> = ({ blocks }) => {
  const columns: IColumn[] = [
    {
      key: 'columnIndex',
      name: 'Index',
      fieldName: 'index',
      iconName: 'NumberSymbol',
      isIconOnly: true,
      minWidth: 5,
      maxWidth: 40,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: true,
      data: 'number',
      isPadded: true,
    },
    {
      key: 'columnHash',
      name: 'Block Hash',
      fieldName: 'hash',
      minWidth: 5,
      maxWidth: 450,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
      data: 'string',
      isPadded: true,
      onRender: ({ hash }) => <Link href={`./block/?${hash}`}>{hash}</Link>,
    },
    {
      key: 'columnTimestamp',
      name: 'Timestamp',
      fieldName: 'timestamp',
      minWidth: 100,
      maxWidth: 200,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: true,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'coulmnMiner',
      name: 'Miner',
      fieldName: 'miner',
      minWidth: 123,
      maxWidth: 450,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: true,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'columnTimeTaken',
      name: 'Time Taken',
      minWidth: 50,
      maxWidth: 200,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: true,
      data: 'string',
      isPadded: true,
      onRender: (block, index) => {
        let beforeBlock = blocks[Math.min(index! + 1, blocks.length - 1)];
        let beforeTimestamp = Date.parse(beforeBlock.timestamp);
        let nowTimestamp = Date.parse(block.timestamp);
        return <>{(nowTimestamp - beforeTimestamp) / 1000}</>;
      },
    },
    {
      key: 'columnDifficulty',
      name: 'Difficulty',
      minWidth: 50,
      maxWidth: 200,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: true,
      data: 'string',
      isPadded: true,
      onRender: ({ difficulty }) => <>{difficulty}</>,
    },
    {
      key: 'columnTxNumber',
      name: 'Tx #',
      minWidth: 5,
      maxWidth: 20,
      isRowHeader: true,
      isResizable: true,
      isSorted: false,
      isSortedDescending: false,
      data: 'number',
      isPadded: true,
      onRender: ({ transactions }) => <>{transactions.length}</>,
    },
  ];
  return (
    <DetailsList
      items={blocks.slice(0, -1)}
      columns={columns}
      selectionMode={SelectionMode.none}
      getKey={block => block.hash}
      setKey="set"
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
      onItemInvoked={({ hash }) => navigate(`/block/?${hash}`)}
    />
  );
};

export default IndexPage;
